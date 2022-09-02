import { Prisma } from '@prisma/client'
import dayjs from 'dayjs'
import { prisma } from '../../helpers/prisma'

export async function saveHouse(house: Prisma.HouseCreateInput) {
  const saved = await prisma.house.findUnique({
    where: {
      hash: house.hash,
    },
  })
  if (saved) {
    return saved
  }
  return prisma.house.upsert({
    where: {
      uuid: house.uuid,
    },
    update: house,
    create: house,
  })
}

export function getLatestHouses(date: dayjs.Dayjs) {
  return prisma.house.findMany({
    where: {
      updatedAt: {
        gte: date.toDate(),
      },
    },
  })
}

export function getHouses() {
  return prisma.house.findMany()
}

export function getHousesByYear(year: dayjs.Dayjs) {
  return prisma.house.findMany({
    where: {
      startAt: {
        gte: year.startOf('year').toDate(),
        lte: year.endOf('year').toDate(),
      },
    },
  })
}
