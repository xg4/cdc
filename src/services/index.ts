import { HOUSE_YEARS } from '@/constants'
import data from '@/data.json'
import dayjs from 'dayjs'
import { z } from 'zod'

export interface House {
  uuid: string
  region: string
  name: string
  scope: string
  amount: number
  startAt: string
  endAt: string
}

export const yearParamsSchema = z.object({
  year: z.coerce
    .number()
    .int()
    .refine(val => HOUSE_YEARS.includes(val)),
})

export function getHousesByYear(year: number) {
  const d = dayjs().year(year)

  const yearData = data.filter(h => d.startOf('year').isBefore(h.startAt) && d.endOf('year').isAfter(h.startAt))

  return yearData
}

export function getHouses() {
  return data
}
