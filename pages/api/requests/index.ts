import { Prisma, PrismaClient } from '@prisma/client'
import { SHA256 } from 'crypto-js'
import { isInteger, toString } from 'lodash'
import type { NextApiRequest, NextApiResponse } from 'next'
import { pull } from '../../../helpers'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const page = +req.query.page!
  if (!isInteger(page)) {
    res.status(400).json('参数错误')
    return
  }

  let houses
  try {
    houses = await pull(page)
  } catch {
    res.status(400).json('参数错误')
    return
  }

  const values = houses.map(Object.values).map(toString).toString()

  const hash = SHA256(values).toString()

  const prisma = new PrismaClient()
  const saved = await prisma.request.findFirst({
    where: {
      page,
      hash,
    },
  })
  if (saved) {
    res.status(200).json('success')
    return
  }

  async function saveOrUpdate(
    house: Prisma.HouseCreateInput | Prisma.HouseCreateInput[]
  ) {
    if (Array.isArray(house)) {
      for (const item of house) {
        await saveOrUpdate(item)
      }
      return
    }
    await prisma.house.upsert({
      where: {
        uuid: house.uuid,
      },
      update: house,
      create: house,
    })
  }

  await saveOrUpdate(houses)

  await prisma.request.create({
    data: {
      page,
      hash,
    },
  })

  res.status(201).json('success')
  await prisma.$disconnect()
}