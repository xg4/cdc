import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../helpers/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const count = await prisma.request.count()
  res.json(count)
}
