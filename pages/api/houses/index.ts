import type { NextApiRequest, NextApiResponse } from 'next'
import { getHouses } from '../../../services/server'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const houses = await getHouses()
  res.status(200).json(houses)
}
