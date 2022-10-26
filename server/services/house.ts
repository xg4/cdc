import { Prisma } from '@prisma/client'
import dayjs from 'dayjs'
import { omit } from 'lodash'
import { prisma } from '../utils'

export async function saveHouse(house: Prisma.HouseCreateInput) {
  const saved = await prisma.house.findUnique({
    where: {
      uuid: house.uuid,
    },
  })
  if (!saved) {
    const newHouse = await prisma.house.create({
      data: house,
    })
    return newHouse
  }
  if (saved.status === house.status) {
    return saved
  }
  return prisma.house.update({
    where: {
      uuid: house.uuid,
    },
    data: omit(house, 'profile'),
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
