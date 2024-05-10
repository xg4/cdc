import { getHousesByYear, yearParamsSchema } from '@/services'
import { NextResponse } from 'next/server'

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

    const yearData = getHousesByYear(year)

    return NextResponse.json(yearData)
  } catch {
    return NextResponse.json('服务器错误', {
      status: 500,
    })
  }
}
