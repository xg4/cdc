import { SHA256 } from 'crypto-js'
import { isInteger } from 'lodash'
import type { NextApiRequest, NextApiResponse } from 'next'
import { saveHouse } from '../../../server/services'
import { prisma, pull } from '../../../server/utils'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const page = +req.body.page!
  if (!isInteger(page)) {
    res.status(400).json('参数错误')
    return
  }

  try {
    const houses = await pull(page)

    const hash = SHA256(JSON.stringify(houses)).toString()

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
  } catch {
    res.status(400).json('请求错误')
    return
  }
}
