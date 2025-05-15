import { NextResponse } from "next/server"

export async function GET() {
  // Mock data for SaaS product ideas
  const ideas = [
    {
      "title": "Jazzberry",
      "tagline": "AI Agent for Bug Finding",
      "mrr": "$200\n          /\n          month",
      "link": "https://www.indiehackers.com/product/jazzberry"
    },
    {
      "title": "Homework",
      "tagline": "A 3 - Tier Passive Income Funnel Built for Digital Hustlers",
      "mrr": "$0\n          /\n          month",
      "link": "https://www.indiehackers.com/product/homework"
    },
    {
      "title": "Emulation BerinX (Berina 6. Nesil)",
      "tagline": "AI, HeartCore AI, Business AI, Emotional Intelligence",
      "mrr": "$3\n          /\n          month",
      "link": "https://www.indiehackers.com/product/emulation-berinx-berina-6-nesil"
    },
    {
      "title": "LinkBlink",
      "tagline": "Upskill with context-rich, personalized learning bytes",
      "mrr": "$0\n          /\n          month",
      "link": "https://www.indiehackers.com/product/linkblink"
    },
    {
      "title": "Instant QR Menu",
      "tagline": "AI menu maker turns printed restaurant menus to QR menu site",
      "mrr": "$0\n          /\n          month",
      "link": "https://www.indiehackers.com/product/instant-qr-menu"
    },
    {
      "title": "Bigzen",
      "tagline": "Design and simulate your business model with AI — instantly",
      "mrr": "$29\n          /\n          month",
      "link": "https://www.indiehackers.com/product/bigzen"
    },
    {
      "title": "Astro",
      "tagline": "proxy",
      "mrr": "$100\n          /\n          month",
      "link": "https://www.indiehackers.com/product/astro"
    },
    {
      "title": "Raposa Trading – The Arena for Competitive Traders",
      "tagline": "The PokerStars of paper trading.",
      "mrr": "$0\n          /\n          month",
      "link": "https://www.indiehackers.com/product/raposa-trading-the-arena-for-competitive-traders"
    },
    {
      "title": "PalDock",
      "tagline": "All-in-one platform for affiliate marketing and lead managem",
      "mrr": "$11\n          /\n          month",
      "link": "https://www.indiehackers.com/product/paldock"
    },
    {
      "title": "OneChat AI",
      "tagline": "Your Pocket AI Companion",
      "mrr": "$0\n          /\n          month",
      "link": "https://www.indiehackers.com/product/onechat-ai"
    },
    {
      "title": "visernic",
      "tagline": "Team of Creative Designers & Developers",
      "mrr": "$25,899\n          /\n          month",
      "link": "https://www.indiehackers.com/product/visernic"
    },
    {
      "title": "Leader's Edge",
      "tagline": "Self-paced e-course developing emerging leaders",
      "mrr": "$0\n          /\n          month",
      "link": "https://www.indiehackers.com/product/leaders-edge"
    },
    {
      "title": "RCM Matter",
      "tagline": "Top Notch Medical Billing Services Company",
      "mrr": "$0\n          /\n          month",
      "link": "https://www.indiehackers.com/product/rcm-matter"
    },
    {
      "title": "Flibbar",
      "tagline": "Uncensored Social Media, Instant Messaging and File Sharing",
      "mrr": "$0\n          /\n          month",
      "link": "https://www.indiehackers.com/product/flibbar"
    },
    {
      "title": "Sheband",
      "tagline": "It’s an app like uber but only for girls woman’s and kids",
      "mrr": "$0\n          /\n          month",
      "link": "https://www.indiehackers.com/product/sheband"
    },
    {
      "title": "Free Document Maker",
      "tagline": "AI Tools to Instantly Create Invoices, PDFs, and More – Free",
      "mrr": "$0\n          /\n          month",
      "link": "https://www.indiehackers.com/product/free-document-maker"
    },
    {
      "title": "ShareAI",
      "tagline": "Think Uber, but for AI Open Source Models",
      "mrr": "$0\n          /\n          month",
      "link": "https://www.indiehackers.com/product/shareai"
    },
    {
      "title": "HEIC to JPG Converter",
      "tagline": "Convert your HEIC images to JPG format easily",
      "mrr": "$0\n          /\n          month",
      "link": "https://www.indiehackers.com/product/heic-to-jpg-converter"
    }
  ]

  // Add a small delay to simulate network latency
  await new Promise((resolve) => setTimeout(resolve, 500))

  return NextResponse.json({ ideas })
}
