import { Prisma } from '@prisma/client'
import dayjs from 'dayjs'
import { isMatch } from 'lodash'
import { prisma } from '../utils/prisma'

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

  if (!isMatch(saveHouse, house)) {
    return prisma.house.update({
      where: {
        uuid: house.uuid,
      },
      data: house,
    })
  }
}

export function getHouses() {
  return prisma.house.findMany({
    orderBy: {
      id: 'desc',
    },
  })
}

export function getHousesByYear(year: number) {
  const d = dayjs().year(year)
  return prisma.house.findMany({
    where: {
      startAt: {
        gte: d.startOf('year').toDate(),
        lte: d.endOf('year').toDate(),
      },
    },
    orderBy: {
      id: 'asc',
    },
  })
}
