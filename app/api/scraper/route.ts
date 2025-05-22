// app/api/scrape/route.ts
import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseClient' // adjust path as needed

export async function GET() {
  try {
    // 1. Call the scraper microservice
    const res = await fetch('http://localhost:4000/scrape')
    console.log('response: ', res)
    const { products } = await res.json()
    console.log('products: ', products)
    if (!Array.isArray(products)) {
      throw new Error('Scraper did not return products array')
    }

    // 2. Insert into Supabase
    const { error } = await supabase.from('scraped_products').insert(products)

    if (error) {
      console.error('❌ Supabase insert error:', error)
      return NextResponse.json({ error: 'Failed to insert into DB' }, { status: 500 })
    }

    return NextResponse.json({ message: `✅ Scraped and stored ${products.length} products` })
  } catch (err) {
    console.error('❌ API scrape error:', err)
    return NextResponse.json({ error: 'Scrape failed' }, { status: 500 })
  }
}
