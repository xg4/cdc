import { getLatestHouses } from '@/server/services'
import { NextResponse } from 'next/server'
import { z } from 'zod'

const jsonDataSchema = z.object({
  buildDate: z.string().datetime(),
})

export async function POST(request: Request) {
  try {
    const { buildDate } = await request.json().then(jsonDataSchema.parse)

    const houses = await getLatestHouses(buildDate)
    return NextResponse.json(houses)
  } catch {
    return NextResponse.json('服务器错误', {
      status: 500,
    })
  }
}
