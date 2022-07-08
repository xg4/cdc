import { request } from '../helpers'
import { House } from '../types'

export function getHouses(): Promise<House[]> {
  return request.get('houses')
}

export function getAllHouses(): Promise<House[]> {
  return request.get('houses/all')
}

export function getHousesByYear(year: number): Promise<House[]> {
  return request.get('houses/' + year)
}
