import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
export async function GET() {
  const { data: stats } = await supabaseAdmin.from('itsr_coin_stats').select('*').eq('id', 1).single()
  if (!stats) return NextResponse.json({ stats: { total_supply: 1000000000000, circulating_supply: 0, total_holders: 0, total_transactions: 0, total_pkr_deposited: 0, rate_pkr_per_coin: 1 } })
  return NextResponse.json({ stats })
}