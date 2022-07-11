import dayjs from 'dayjs'
import { NextApiRequest, NextApiResponse } from 'next'
import { getYears } from '../../../helpers'
import { prisma } from '../../../helpers/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const year = Number(req.query.year)
  const years = getYears()
  if (!year || !years.includes(year)) {
    res.status(400).json({
      error: 'Invalid year',
    })
    return
  }

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
  res.json(houses)
}
