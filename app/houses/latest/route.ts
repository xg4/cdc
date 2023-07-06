import { getLatestHouses } from '@/server/services'
import { getUrlQuery } from '@/utils/url'
import dayjs from 'dayjs'
import { NextResponse } from 'next/server'
import { z } from 'zod'

const schema = z.object({
  date: z.string().datetime(),
})

export async function GET(request: Request) {
  try {
    const { date } = schema.parse(getUrlQuery(request.url))

    const houses = await getLatestHouses(dayjs(date))
    return NextResponse.json(houses)
  } catch {
    return NextResponse.json('服务器错误', {
      status: 500,
    })
  }
}
