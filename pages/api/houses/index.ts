import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../helpers/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const houses = await prisma.house.findMany()
  res.json(houses)
}
