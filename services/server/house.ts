import dayjs from 'dayjs'
import { prisma } from '../../helpers/prisma'

export function getLatestHouses() {
  return prisma.house.findMany({
    where: {
      startAt: {
        gte: dayjs().startOf('year').toDate(),
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
