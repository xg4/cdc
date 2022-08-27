import { PrismaClient } from '@prisma/client'
import dayjs from 'dayjs'
import type { NextApiRequest, NextApiResponse } from 'next'
import { HOUSE_YEARS } from '../../../constants'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const year = +req.query.year!

  if (!HOUSE_YEARS.includes(year)) {
    res.status(400).json('参数错误')
    return
  }

  const prisma = new PrismaClient()

  const currentYear = dayjs().year(year)

  const start = currentYear.startOf('year').toDate()
  const end = currentYear.endOf('year').toDate()
  const houses = await prisma.house.findMany({
    where: {
      startAt: {
        gte: start,
        lte: end,
      },
    },
  })

  res.status(200).json(houses)
  await prisma.$disconnect()
}
