import { getHousesByYear } from '@/server/services'
import dayjs from 'dayjs'
import { NextResponse } from 'next/server'
import { z } from 'zod'

const schema = z.object({
  year: z.coerce.number().int().max(dayjs().year()).min(2017),
})

export async function GET(
  _: Request,
  {
    params,
  }: {
    params: { year: string }
  },
) {
  try {
    const { year } = schema.parse(params)

    const houses = await getHousesByYear(dayjs().year(year))
    return NextResponse.json(houses)
  } catch {
    return NextResponse.json('服务器错误', {
      status: 500,
    })
  }
}
