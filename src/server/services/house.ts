import { Prisma } from '@prisma/client'
import dayjs from 'dayjs'
import { omit } from 'lodash'
import { prisma } from '../utils'

const select = {
  uuid: true,
  name: true,
  region: true,
  quantity: true,
  status: true,
  endsAt: true,
  startAt: true,
}

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
      data: omit(house, 'profile'),
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
    select,
  })
}

export function getHouses() {
  return prisma.house.findMany({
    select,
  })
}

export function getHousesByYear(year: dayjs.Dayjs) {
  return prisma.house.findMany({
    where: {
      startAt: {
        gte: year.startOf('year').toDate(),
        lte: year.endOf('year').toDate(),
      },
    },
    select,
  })
}
