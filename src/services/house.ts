import { House } from '@prisma/client'
import { request } from '../utils'

export function syncHouses(page = 1): Promise<House[]> {
  return request.post('/houses/sync', { page })
}

export function getLatestHouses(): Promise<House[]> {
  return request.post('/houses/latest', {
    buildDate: process.env.buildDate,
  })
}

export function getHouses(): Promise<House[]> {
  return request.get('/houses')
}

export function getHousesByYear(year: number): Promise<House[]> {
  return request.get('/houses/' + year)
}
