import { saveHouse } from '@/server/services'
import { pull } from '@/server/utils'
import { compact } from 'lodash'
import { NextResponse } from 'next/server'
import { z } from 'zod'

const schema = z.object({
  page: z.number().int(),
})

export async function POST(request: Request) {
  try {
    const { page } = await request.json().then(schema.parse)
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
