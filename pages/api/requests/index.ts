import { SHA256 } from 'crypto-js'
import { isInteger } from 'lodash'
import type { NextApiRequest, NextApiResponse } from 'next'
import { pull } from '../../../helpers'
import { prisma } from '../../../helpers/prisma'
import { saveHouse } from '../../../services/server'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const page = +req.body.page!
  if (!isInteger(page)) {
    res.status(400).json('参数错误')
    return
  }

  let houses
  try {
    houses = await pull(page)
  } catch {
    res.status(400).json('请求错误')
    return
  }

  const values = houses.map((i) => i.hash).toString()
  const hash = SHA256(values).toString()

  const saved = await prisma.request.findUnique({
    where: {
      hash,
    },
  })
  if (saved) {
    res.status(200).json('更新成功')
    return
  }

  await Promise.all([
    prisma.request.create({
      data: {
        page,
        hash,
      },
    }),
    ...houses.map(saveHouse),
  ])

  res.status(201).json('更新成功')
}
