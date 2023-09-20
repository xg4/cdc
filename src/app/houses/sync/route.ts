import { saveHouse } from '@/server/services'
import { pull } from '@/utils/spider'
import { NextResponse } from 'next/server'
import { z } from 'zod'

const jsonDataSchema = z.object({
  page: z.number().int(),
})

export async function POST(request: Request) {
  try {
    const { page } = await request.json().then(jsonDataSchema.parse)
    const houses = await pull(page)
    for (const h of houses) {
      await saveHouse(h)
    }
    return NextResponse.json('ok', {
      status: 201,
    })
  } catch {
    return NextResponse.json('服务器错误', {
      status: 500,
    })
  }
}
