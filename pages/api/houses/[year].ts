import { PrismaClient } from '@prisma/client'
import dayjs from 'dayjs'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const year = +req.query.year!

  const currentYear = dayjs().year(year)
  if (!currentYear.isValid()) {
    res.status(400).json('参数错误')
    return
  }

  const prisma = new PrismaClient()
  const houses = await prisma.house.findMany({
    where: {
      startAt: {
        gte: currentYear.startOf('year').toDate(),
        lte: currentYear.endOf('year').toDate(),
      },
    },
  })

  res.status(200).json(houses)
  await prisma.$disconnect()
}
