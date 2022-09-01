import type { NextApiRequest, NextApiResponse } from 'next'
import { getLatestHouses } from '../../../services/server'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const houses = await getLatestHouses()
  res.status(200).json(houses)
}
