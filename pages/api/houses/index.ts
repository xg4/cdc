import { PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prisma = new PrismaClient()
  const houses = await prisma.house.findMany()
  res.status(200).json(houses)
  await prisma.$disconnect()
}
