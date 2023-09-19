import { getHousesByYear } from '@/server/services'
import dayjs from 'dayjs'
import { NextResponse } from 'next/server'
import { z } from 'zod'
import { yearParamsSchema } from './schema'

export async function GET(
  _: Request,
  {
    params,
  }: {
    params: { year: string }
  },
) {
  try {
    const { year } = yearParamsSchema.parse(params)

    const houses = await getHousesByYear(year)
    return NextResponse.json(houses)
  } catch {
    return NextResponse.json('服务器错误', {
      status: 500,
    })
  }
}
