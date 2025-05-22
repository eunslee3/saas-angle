import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabaseClient"


export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const page = parseInt(searchParams.get('page') || '1', 10)
  const limit = 50
  const from = (page - 1) * limit
  const to = from + limit - 1

  const { data: ideas, error } = await supabase
    .from('scraped_products')
    .select('*')
    .range(from, to)
    .order('id', { ascending: false }) // Optional: newest first

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ ideas, page })
}