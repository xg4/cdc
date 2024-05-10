import { getHouses } from '@/services'
import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json(getHouses())
}
