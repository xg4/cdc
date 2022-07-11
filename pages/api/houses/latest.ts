import dayjs from 'dayjs'
import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../helpers/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const lastYear = dayjs().subtract(1, 'year').toDate()
  const houses = await prisma.house.findMany({
    where: {
      startAt: {
        gte: lastYear,
      },
    },
  })
  res.json(houses)
}
