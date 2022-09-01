import { House } from '@prisma/client'
import { request } from '../helpers'

export function getLatestHouses(): Promise<House[]> {
  return request.get('/houses/latest')
}

export function getHouses(): Promise<House[]> {
  return request.get('/houses')
}

export function getHousesByYear(year: number): Promise<House[]> {
  return request.get('/houses/' + year)
}
