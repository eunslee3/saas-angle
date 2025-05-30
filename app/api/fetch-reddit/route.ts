// app/api/fetch-reddit/route.ts

import { NextRequest, NextResponse } from 'next/server'

const CLIENT_ID = process.env.REDDIT_CLIENT_ID!
const CLIENT_SECRET = process.env.REDDIT_CLIENT_SECRET!

// Helper: Get app-level access token
async function getRedditAccessToken(): Promise<string> {
  const form = new URLSearchParams({
    grant_type: 'client_credentials',
  })

  const response = await fetch('https://www.reddit.com/api/v1/access_token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: form.toString(),
  })

  const data = await response.json()
  if (!response.ok) {
    console.error('Error getting token:', data)
    throw new Error('Failed to get Reddit access token')
  }

  return data.access_token
}

const STOP_WORDS = new Set([
  'a', 'an', 'the', 'and', 'or', 'but', 'if', 'then', 'so', 'because',
  'as', 'of', 'for', 'in', 'on', 'at', 'to', 'from', 'by', 'with',
  'about', 'this', 'that', 'it', 'is', 'are', 'was', 'were', 'be',
  'have', 'has', 'had', 'do', 'does', 'did', 'you', 'your', 'my',
  'we', 'they', 'he', 'she', 'them', 'i', 'me'
])

export function extractKeywords(input: string): string[] {
  const keywords = input
    .toLowerCase()
    .replace(/[^\w\s]/g, '') // Remove punctuation
    .split(/\s+/)
    .filter(word => word && word.length > 2 && !STOP_WORDS.has(word))

  return keywords
}

// Enhanced helper function to get relevant subreddits based on business category
function getRelevantSubreddits(businessIdea: string): string[] {
  // Always include pain point-focused subreddits for broader frustration discovery
  const painPointSubs = ['mildlyinfuriating', 'firstworldproblems', 'DAE']
  
  // Core business subreddits
  const businessSubs = ['entrepreneur', 'smallbusiness']
  
  // Universal high-value subreddits for pain point discovery
  const universalPainSubs = ['personalfinance', 'productivity', 'freelance', 'college']
  
  const categorySubreddits: { [key: string]: string[] } = {
    'wearable': ['fitness', 'loseit', 'getmotivated', 'selfimprovement', 'ADHD'],
    'snack': ['loseit', 'fitness', 'getmotivated', 'keto', 'intermittentfasting', 'nutrition'],
    'email': ['sales', 'marketing', 'freelance', 'digitalnomad'],
    'project': ['productivity', 'projectmanagement', 'getmotivated'],
    'finance': ['accounting', 'personalfinance', 'smallbusiness'],
    'social': ['socialmedia', 'marketing', 'youtubers', 'podcasting'],
    'ecommerce': ['ecommerce', 'shopify', 'retail'],
    'saas': ['SaaS', 'webdev', 'programming'],
    'diet': ['loseit', 'fitness', 'nutrition', 'keto'],
    'habit': ['getmotivated', 'selfimprovement', 'decidingtobebetter', 'ADHD'],
    'productivity': ['productivity', 'getmotivated', 'ADHD', 'studytips'],
    'health': ['loseit', 'fitness', 'nutrition', 'mentalhealth'],
    'tech': ['webdev', 'programming', 'sysadmin', 'techsupport'],
    'content': ['youtubers', 'podcasting', 'writing', 'blogging'],
    'parenting': ['parenting', 'daddit', 'mommit', 'beyondthebump'],
    'education': ['college', 'students', 'teachers', 'homeschool'],
    'remote': ['freelance', 'digitalnomad', 'remotework'],
    'customer': ['retail', 'customerservice', 'ecommerce'],
    'work': ['antiwork', 'jobs', 'careerguidance', 'freelance']
  }
  
  const lowerIdea = businessIdea.toLowerCase()
  
  // Start with pain point and business subs
  const matchedSubreddits = new Set([...painPointSubs, ...businessSubs])
  
  // Add universal pain point subs
  universalPainSubs.forEach(sub => matchedSubreddits.add(sub))
  
  // Add category-specific subreddits
  for (const [category, subreddits] of Object.entries(categorySubreddits)) {
    if (lowerIdea.includes(category)) {
      subreddits.forEach(sub => matchedSubreddits.add(sub))
    }
  }
  
  // Enhanced compound concept detection
  if (lowerIdea.includes('food') || lowerIdea.includes('eating') || lowerIdea.includes('junk') || lowerIdea.includes('diet')) {
    ['loseit', 'fitness', 'nutrition', 'mildlyinfuriating'].forEach(sub => matchedSubreddits.add(sub))
  }
  
  if (lowerIdea.includes('control') || lowerIdea.includes('habit') || lowerIdea.includes('addiction')) {
    ['getmotivated', 'selfimprovement', 'decidingtobebetter', 'ADHD'].forEach(sub => matchedSubreddits.add(sub))
  }
  
  if (lowerIdea.includes('work') || lowerIdea.includes('job') || lowerIdea.includes('office')) {
    ['antiwork', 'jobs', 'careerguidance', 'productivity'].forEach(sub => matchedSubreddits.add(sub))
  }
  
  if (lowerIdea.includes('student') || lowerIdea.includes('school') || lowerIdea.includes('learn')) {
    ['college', 'students', 'studytips', 'getmotivated'].forEach(sub => matchedSubreddits.add(sub))
  }
  
  if (lowerIdea.includes('parent') || lowerIdea.includes('child') || lowerIdea.includes('family')) {
    ['parenting', 'daddit', 'mommit', 'beyondthebump'].forEach(sub => matchedSubreddits.add(sub))
  }
  
  if (lowerIdea.includes('money') || lowerIdea.includes('budget') || lowerIdea.includes('expense')) {
    ['personalfinance', 'frugal', 'povertyfinance'].forEach(sub => matchedSubreddits.add(sub))
  }
  
  // Additional frustration-based subreddits for broader pain point discovery
  if (lowerIdea.includes('problem') || lowerIdea.includes('issue') || lowerIdea.includes('struggle')) {
    ['NoStupidQuestions', 'unpopularopinion', 'tipofmytongue'].forEach(sub => matchedSubreddits.add(sub))
  }
  
  return Array.from(matchedSubreddits)
}

// AI-powered search query generation using OpenAI Function Calling
async function getAISearchQueries(businessIdea: string): Promise<string[]> {
  try {
    const prompt = `Generate 3-4 specific Reddit search phrases to find people discussing problems this business idea could solve: "${businessIdea}"

Focus on the actual language people use when frustrated or seeking help. Think about what someone would type when they're struggling with this problem.

Examples:
- For a productivity app: "can't focus at work", "always getting distracted"  
- For a dating app: "tired of dating apps", "can't find genuine connections"
- For a diet app: "can't stop eating junk food", "always fail at diets"`

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{
          role: 'user',
          content: prompt
        }],
        functions: [{
          name: 'return_search_queries',
          description: 'Return search queries for finding Reddit pain points',
          parameters: {
            type: 'object',
            properties: {
              queries: {
                type: 'array',
                description: 'Array of 3-4 search phrases people would use when frustrated',
                items: {
                  type: 'string',
                  minLength: 5,
                  maxLength: 100
                },
                minItems: 3,
                maxItems: 4
              }
            },
            required: ['queries']
          }
        }],
        function_call: { name: 'return_search_queries' },
        max_tokens: 200,
        temperature: 0.7,
      }),
    })

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`)
    }

    const data = await response.json()
    
    // Extract function call result
    const functionCall = data.choices[0].message.function_call
    if (functionCall && functionCall.name === 'return_search_queries') {
      const args = JSON.parse(functionCall.arguments)
      
      if (args.queries && Array.isArray(args.queries)) {
        return args.queries
          .filter((query: string) => typeof query === 'string' && query.length > 0)
          .slice(0, 4)
      }
    }
    
    throw new Error('Invalid function call response')

  } catch (error) {
    console.error('Error generating AI search queries:', error)
    return getManualSearchQueries(businessIdea)
  }
}

// Enhanced fallback manual search query generation
function getManualSearchQueries(businessIdea: string): string[] {
  const lowerIdea = businessIdea.toLowerCase()
  
  const coreQueries: { [key: string]: string[] } = {
    'wearable': ['can\'t stop bad habits', 'need motivation to exercise', 'always break my diet'],
    'snack': ['can\'t stop eating junk food', 'always fail at diets', 'binge eating problems', 'no willpower with food'],
    'email': ['cold emails get ignored', 'low email response rates', 'outreach not working', 'sales emails suck'],
    'project': ['always miss deadlines', 'can\'t stay organized', 'projects fall behind', 'bad at time management'],
    'invoice': ['clients pay late', 'invoicing takes forever', 'cash flow problems', 'billing is a nightmare'],
    'social': ['social media posts get no engagement', 'can\'t grow followers', 'content creation struggles', 'low reach on posts'],
    'productivity': ['can\'t focus at work', 'always procrastinate', 'get distracted easily', 'time management issues'],
    'finance': ['can\'t stick to budget', 'overspend every month', 'bad with money', 'expenses out of control'],
    'health': ['can\'t lose weight', 'no motivation to exercise', 'healthy habits don\'t stick', 'always quit fitness'],
    'work': ['hate my job', 'workplace stress', 'burned out at work', 'toxic work environment'],
    'education': ['can\'t focus while studying', 'bad study habits', 'test anxiety problems', 'poor grades despite effort']
  }
  
  for (const [category, queries] of Object.entries(coreQueries)) {
    if (lowerIdea.includes(category)) {
      return queries
    }
  }
  
  // Final fallback: convert keywords to problem phrases
  const keywords = extractKeywords(businessIdea)
  return keywords.slice(0, 3).map(keyword => `problems with ${keyword}`)
}

// Enhanced search query generation with AI + fallback
async function getBusinessSearchQueries(businessIdea: string): Promise<string[]> {
  try {
    // Try AI first
    return await getAISearchQueries(businessIdea)
  } catch (error) {
    console.error('AI search query generation failed, using manual fallback:', error)
    // Fallback to manual extraction
    return getManualSearchQueries(businessIdea)
  }
}

// Enhanced pain point detection function
function detectPainPointIndicators(post: any): { isPainPoint: boolean; indicators: string[]; matchedKeywords: string[] } {
  const title = post.title.toLowerCase()
  const text = (post.selftext || '').toLowerCase()
  const fullText = `${title} ${text}`
  
  const painPointKeywords = [
    'problem', 'issue', 'struggle', 'help', 'how to', 'frustrated', 'annoying', 
    'hate when', 'can\'t', 'always fail', 'never works', 'tired of', 'sick of',
    'why does', 'why do', 'worst', 'terrible', 'awful', 'horrible', 'drives me crazy',
    'makes me mad', 'so annoying', 'really bothers', 'getting on my nerves',
    'fed up', 'had enough', 'can\'t stand', 'wish there was', 'if only',
    'someone should make', 'there has to be', 'desperately need', 'really need',
    'urgent', 'emergency', 'crisis', 'disaster', 'nightmare', 'hell',
    'impossible', 'hopeless', 'useless', 'broken', 'doesn\'t work', 'fails',
    'sucks', 'worst thing', 'major problem', 'big issue', 'serious problem'
  ]
  
  const matchedKeywords: string[] = []
  const indicators: string[] = []
  
  for (const keyword of painPointKeywords) {
    if (fullText.includes(keyword)) {
      matchedKeywords.push(keyword)
      
      // Find the sentence/phrase containing this keyword for context
      const sentences = fullText.split(/[.!?]+/)
      for (const sentence of sentences) {
        if (sentence.includes(keyword) && sentence.trim().length > 10) {
          indicators.push(sentence.trim())
          break // Only take first occurrence per keyword
        }
      }
    }
  }
  
  return {
    isPainPoint: matchedKeywords.length > 0,
    indicators: [...new Set(indicators)], // Remove duplicates
    matchedKeywords: [...new Set(matchedKeywords)] // Remove duplicates
  }
}

// Sleep function for rate limiting
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export async function POST(req: NextRequest) {
  try {
    const { businessIdea = '', searchLimit = 25 } = await req.json()
    
    if (!businessIdea.trim()) {
      return NextResponse.json({ error: 'Business idea is required' }, { status: 400 })
    }

    const token = await getRedditAccessToken()
    
    // Get AI-powered search queries and relevant subreddits
    const searchQueries = await getBusinessSearchQueries(businessIdea)
    const subreddits = getRelevantSubreddits(businessIdea)
    
    const allResults: any[] = []
    
    // Search across multiple subreddits (increased limit for better coverage)
    for (const subreddit of subreddits.slice(0, 8)) { // Increased from 5 to 8 subreddits
      try {
        // Use AI-generated search queries instead of OR keywords
        for (const query of searchQueries.slice(0, 2)) { // Test 2 queries per subreddit
          const searchUrl = `https://oauth.reddit.com/r/${subreddit}/search?q=${encodeURIComponent(query)}&sort=relevance&limit=${Math.ceil(searchLimit/2)}&t=year&restrict_sr=1`
          
          const redditRes = await fetch(searchUrl, {
            headers: {
              Authorization: `Bearer ${token}`,
              'User-Agent': 'BeachheadBot/0.1 by YourUsername',
            },
          })

          if (redditRes.ok) {
            const searchData = await redditRes.json()
            
            if (searchData.data?.children?.length > 0) {
              // Find existing result for this subreddit or create new one
              let subredditResult = allResults.find(r => r.subreddit === subreddit)
              if (!subredditResult) {
                subredditResult = {
                  subreddit,
                  queries: [],
                  posts: []
                }
                allResults.push(subredditResult)
              }
              
              subredditResult.queries.push(query)
              
              const newPosts = searchData.data.children.map((child: any) => {
                const postData = {
                  title: child.data.title,
                  selftext: child.data.selftext,
                  score: child.data.score,
                  num_comments: child.data.num_comments,
                  created_utc: child.data.created_utc,
                  url: `https://reddit.com${child.data.permalink}`,
                  subreddit: child.data.subreddit,
                  query: query // Track which query found this post
                }
                
                // Add pain point analysis
                const painPointAnalysis = detectPainPointIndicators(postData)
                return {
                  ...postData,
                  painPointAnalysis
                }
              })
              
              // Avoid duplicates
              newPosts.forEach(newPost => {
                if (!subredditResult.posts.some(existing => existing.url === newPost.url)) {
                  subredditResult.posts.push(newPost)
                }
              })
            }
          }
          
          // Rate limiting between queries
          await sleep(800)
        }
        
        // Additional rate limiting between subreddits
        await sleep(300)
        
      } catch (error) {
        console.error(`Error searching ${subreddit}:`, error)
        // Continue with other subreddits even if one fails
      }
    }
    
    // Aggregate and analyze results
    const totalPosts = allResults.reduce((sum, result) => sum + result.posts.length, 0)
    const avgScore = allResults
      .flatMap(result => result.posts)
      .reduce((sum, post, _, arr) => sum + post.score / arr.length, 0)
    
    // Extract pain point posts with detailed analysis
    const painPointPosts = allResults
      .flatMap(result => result.posts)
      .filter(post => post.painPointAnalysis.isPainPoint)
      .map(post => ({
        title: post.title,
        selftext: post.selftext ? post.selftext.substring(0, 300) + (post.selftext.length > 300 ? '...' : '') : '',
        url: post.url,
        subreddit: post.subreddit,
        score: post.score,
        num_comments: post.num_comments,
        query: post.query,
        painPointIndicators: post.painPointAnalysis.indicators,
        matchedKeywords: post.painPointAnalysis.matchedKeywords,
        created_utc: post.created_utc
      }))
      .sort((a, b) => b.score - a.score) // Sort by engagement (score)
    
    const response = {
      businessIdea,
      aiGeneratedQueries: searchQueries, // Show the AI-generated search queries
      subredditsSearched: subreddits.slice(0, 8), // Updated to show 8 subreddits
      totalResults: totalPosts,
      averageScore: Math.round(avgScore),
      results: allResults,
      validationMetrics: {
        totalDiscussions: totalPosts,
        averageEngagement: Math.round(avgScore),
        subredditCoverage: allResults.length,
        painPointIndicators: painPointPosts.length,
        topPainPoints: painPointPosts.slice(0, 10) // Top 10 pain point posts by engagement
      },
      painPointDetails: {
        totalPainPointPosts: painPointPosts.length,
        topPainPointPosts: painPointPosts.slice(0, 20), // Top 20 for detailed analysis
        commonKeywords: (() => {
          const keywordCounts: { [key: string]: number } = {}
          painPointPosts.forEach(post => {
            post.matchedKeywords.forEach(keyword => {
              keywordCounts[keyword] = (keywordCounts[keyword] || 0) + 1
            })
          })
          return Object.entries(keywordCounts)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 15)
            .map(([keyword, count]) => ({ keyword, count }))
        })(),
        subredditBreakdown: (() => {
          const subredditCounts: { [key: string]: number } = {}
          painPointPosts.forEach(post => {
            subredditCounts[post.subreddit] = (subredditCounts[post.subreddit] || 0) + 1
          })
          return Object.entries(subredditCounts)
            .sort(([,a], [,b]) => b - a)
            .map(([subreddit, count]) => ({ subreddit, count }))
        })()
      }
    }

    return NextResponse.json(response)
    
  } catch (err: any) {
    console.error('Reddit API Error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}