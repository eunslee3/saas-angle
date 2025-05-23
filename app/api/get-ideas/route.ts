import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabaseClient"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  const page = parseInt(searchParams.get('page') || '1', 10)
  const limit = 50
  const from = (page - 1) * limit
  const to = from + limit - 1

  const min = parseInt(searchParams.get('min') || '0', 10)
  const rawMax = searchParams.get('max')
  const max = rawMax === '1000000' ? Number.MAX_SAFE_INTEGER : parseInt(rawMax || '1000000', 10)
  

  const { data: ideas, error } = await supabase
    .from('scraped_products')
    .select('*')
    .gte('mrr_value', min)
    .lte('mrr_value', max)
    .order('id', { ascending: false })
    .range(from, to)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ ideas, page })
}
