import { Prisma } from '@prisma/client'
import dayjs from 'dayjs'
import { prisma } from '../utils'

export async function saveHouse(house: Prisma.HouseCreateInput) {
  const savedHouse = await prisma.house.findUnique({
    where: {
      uuid: house.uuid,
    },
  })
  if (!savedHouse) {
    return prisma.house.create({
      data: house,
    })
  }

  if (savedHouse.hash !== house.hash) {
    return prisma.house.update({
      where: {
        uuid: house.uuid,
      },
      data: house,
    })
  }
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
