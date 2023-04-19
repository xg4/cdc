import { Prisma } from '@prisma/client'
import { load } from 'cheerio'
import { head } from 'lodash'
import buildURL from './buildURL'
import { md5 } from './md5'
import { getTzDate } from './time'

function filterData(sourceData: string[]): Prisma.HouseCreateInput {
  const hash = md5(sourceData.join())
  const [
    uuid,
    ,
    region,
    name,
    certificateNumber,
    detail,
    quantity,
    phoneNumber,
    startAt,
    endsAt,
    externalDate,
    internalDate,
    qrCodeDate,
    status,
  ] = sourceData
  return {
    uuid,
    region,
    name,
    quantity: Number(quantity),
    startAt: getTzDate(startAt),
    endsAt: getTzDate(endsAt),
    status,
    hash,
    profile: {
      create: {
        detail,
        phoneNumber,
        certificateNumber,
        externalDate: externalDate ? getTzDate(externalDate) : null,
        internalDate: internalDate ? getTzDate(internalDate) : null,
        qrCodeDate: qrCodeDate ? getTzDate(qrCodeDate) : null,
      },
    },
  }
}

function parseHtml(htmlStr: string) {
  const $ = load(htmlStr)
  return Array.from($('#_projectInfo > tr')).map(tr => Array.from($(tr).children()).map(td => $(td).text()))
}

export async function pull(pageNo = 1) {
  const url = buildURL(process.env.API_URL!, {
    pageNo,
  })
  const result = await fetch(url, {
    method: 'POST',
  }).then(res => res.text())

  const list = parseHtml(result)
  if (!list.length) {
    throw new Error()
  }

  const first = head(list)

  if (first && first[14] !== '查看') {
    throw new Error()
  }

  return list.reverse().map(filterData)
}
