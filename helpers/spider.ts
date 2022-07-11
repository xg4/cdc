import { House, Prisma } from '@prisma/client'
import { load } from 'cheerio'
import dayjs from 'dayjs'
import { head, isNil, omitBy } from 'lodash'
import { prisma } from './prisma'

function parse(data: string) {
  const $ = load(data)
  const trList: string[][] = []
  $('#_projectInfo > tr').each((_, tr) => {
    const tdList: string[] = []
    $(tr)
      .find('td')
      .each((_, td) => {
        tdList.push($(td).text())
      })

    trList.push(tdList)
  })
  return trList
}

function filterData([
  uuid,
  ,
  region,
  name,
  certificateNumber,
  range,
  quantity,
  phoneNumber,
  startAt,
  endsAt,
  freezeDate,
  freeze2Date,
  qualificationDate,
  status,
]: string[]): Prisma.HouseCreateInput {
  const house = {
    uuid,
    region,
    name,
    certificateNumber,
    range,
    quantity: Number(quantity),
    phoneNumber,
    startAt: dayjs.tz(startAt, 'Asia/Shanghai').toDate(),
    endsAt: dayjs.tz(endsAt, 'Asia/Shanghai').toDate(),
    freezeDate: freezeDate
      ? dayjs.tz(freezeDate, 'Asia/Shanghai').toDate()
      : null,
    freeze2Date: freeze2Date
      ? dayjs.tz(freeze2Date, 'Asia/Shanghai').toDate()
      : null,
    qualificationDate: qualificationDate
      ? dayjs.tz(qualificationDate, 'Asia/Shanghai').toDate()
      : null,
    status,
  }
  return omitBy(house, isNil) as Prisma.HouseCreateInput
}

export async function pull(page = 1) {
  const urlParams = new URLSearchParams({
    pageNo: String(page),
  })
  const url = `${process.env.ORIGIN_URL}?${urlParams.toString()}`
  const result = await fetch(url, {
    method: 'post',
  }).then((res) => res.text())

  const list = parse(result)
  if (!list.length) {
    return
  }

  const first = head(list)

  // 数据异常
  if (first && first[14] !== '查看') {
    throw new Error('原数据异常')
  }

  const _list = list.reverse().map(filterData)
  const houses: House[] = []
  function saveOrUpdate(house: Prisma.HouseCreateInput) {
    return prisma.house.upsert({
      where: {
        uuid: house.uuid,
      },
      update: house,
      create: house,
    })
  }
  for (const h of _list) {
    const house = await saveOrUpdate(h)
    houses.push(house)
  }

  await prisma.request.create({
    data: {
      urlParams: urlParams.toString(),
      houseIds: houses.map((h) => h.id).join(','),
    },
  })

  return houses
}
