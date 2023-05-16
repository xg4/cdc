import { getLatestHouses } from '@/server/services'
import dayjs from 'dayjs'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const date = searchParams.get('date')

  const buildDate = dayjs(date)
  if (!buildDate.isValid()) {
    return NextResponse.json('参数错误', { status: 400 })
  }

  const houses = await getLatestHouses(buildDate)
  return NextResponse.json(houses)
}
