import { saveHouse } from '@/server/services'
import { prisma } from '@/server/utils/prisma'
import { getPageDetail, pull } from '@/utils/spider'
import { NextResponse } from 'next/server'
import { z } from 'zod'

const jsonDataSchema = z.object({
  page: z.number().int(),
})

export async function GET(request: Request) {
  try {
    const detail = await getPageDetail()
    const dbCount = await prisma.house.count()
    const diff = detail.count - dbCount
    if (diff <= 0) {
      return NextResponse.json('ok', {
        status: 200,
      })
    }
    const page = Math.ceil(diff / 10)
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
