import { NextApiRequest, NextApiResponse } from 'next'
import { pull } from '../../../helpers/spider'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const houses = await pull()
  res.json(houses)
}
