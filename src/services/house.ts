import { House } from '@prisma/client'
import ky from 'ky'

export function getLatestHouses() {
  return ky
    .post('/houses/latest', {
      json: {
        buildDate: process.env.buildDate,
      },
    })
    .json<House[]>()
}
