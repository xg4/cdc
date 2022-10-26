import { House } from '@prisma/client'
import { request } from '../utils'

export function getLatestHouses(): Promise<House[]> {
  return request.get('/houses/latest', {
    params: {
      date: process.env.buildDate,
    },
  })
}

export function getHouses(): Promise<House[]> {
  return request.get('/houses')
}

export function getHousesByYear(year: number): Promise<House[]> {
  return request.get('/houses/' + year)
}
