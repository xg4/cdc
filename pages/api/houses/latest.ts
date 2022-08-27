import { PrismaClient } from '@prisma/client'
import dayjs from 'dayjs'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prisma = new PrismaClient()
  const startAt = dayjs().subtract(6, 'month').toDate()
  const houses = await prisma.house.findMany({
    where: {
      startAt: {
        gte: startAt,
      },
    },
  })
  res.status(200).json(houses)
  await prisma.$disconnect()
}
