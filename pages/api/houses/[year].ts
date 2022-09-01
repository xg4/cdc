import dayjs from 'dayjs'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getHousesByYear } from '../../../services/server'

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

  const houses = await getHousesByYear(currentYear)

  res.status(200).json(houses)
}
