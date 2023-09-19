import { getHouses } from '@/server/services'
import { NextResponse } from 'next/server'

export async function GET() {
  const houses = await getHouses()
  return NextResponse.json(houses)
}
