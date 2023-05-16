import { saveHouse } from '@/server/services'
import { pull } from '@/server/utils'
import { compact, isInteger } from 'lodash'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const res: { page: number } = await request.json()

  const page = +res.page
  if (!isInteger(page)) {
    return NextResponse.json('请求错误', {
      status: 400,
    })
  }

  try {
    const houses = await pull(page)
    const dbHouses = await Promise.all(houses.map(saveHouse))
    const changedHouses = compact(dbHouses)

    return NextResponse.json(changedHouses, {
      status: changedHouses.length ? 201 : 200,
    })
  } catch {
    return NextResponse.json('服务器错误', {
      status: 500,
    })
  }
}
