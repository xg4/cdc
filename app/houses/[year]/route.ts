import { getHousesByYear } from '@/server/services'
import dayjs from 'dayjs'
import { NextResponse } from 'next/server'

export async function GET(
  _: Request,
  {
    params,
  }: {
    params: { year: string }
  },
) {
  const currentYear = dayjs().year(+params.year)
  if (!currentYear.isValid()) {
    return NextResponse.json('参数错误', { status: 400 })
  }

  const houses = await getHousesByYear(currentYear)
  return NextResponse.json(houses)
}
