import dayjs from 'dayjs'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getLatestHouses } from '../../../server/services'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const date = String(req.query.date)

  const buildDate = dayjs(date)
  if (!buildDate.isValid()) {
    res.status(400).json('参数错误')
    return
  }

  const houses = await getLatestHouses(buildDate)
  res.status(200).json(houses)
}
