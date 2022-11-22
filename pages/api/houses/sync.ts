import { compact, isInteger } from 'lodash'
import type { NextApiRequest, NextApiResponse } from 'next'
import { saveHouse } from '../../../server/services'
import { pull } from '../../../server/utils'

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
    const dbHouses = await Promise.all(houses.map(saveHouse))
    const changedHouses = compact(dbHouses)

    res.status(changedHouses.length ? 201 : 200).json(changedHouses)
  } catch {
    res.status(400).json('请求错误')
  }
}
