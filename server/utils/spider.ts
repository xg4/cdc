import { Prisma } from '@prisma/client'
import { load } from 'cheerio'
import { head } from 'lodash'
import { getTzDate } from './time'

function buildURL(url: string, params?: URLSearchParams) {
  if (!params) {
    return url
  }

  const serializedParams = params.toString()

  if (serializedParams) {
    const hashMarkIndex = url.indexOf('#')
    if (hashMarkIndex !== -1) {
      url = url.slice(0, hashMarkIndex)
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams
  }

  return url
}

function filterData([
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
]: string[]): Prisma.HouseCreateInput {
  return {
    uuid,
    region,
    name,
    quantity: Number(quantity),
    startAt: getTzDate(startAt),
    endsAt: getTzDate(endsAt),
    status,
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

    trList.push(tdList.map((t) => t.trim()))
  })
  return trList
}

export async function pull(pageNo = 1) {
  const urlParams = new URLSearchParams({
    pageNo: pageNo.toString(),
  })
  const url = buildURL(process.env.API_URL!, urlParams)
  const result = await fetch(url, {
    method: 'POST',
  }).then((res) => res.text())

  const list = parse(result)
  if (!list.length) {
    throw new Error()
  }

  const first = head(list)

  if (first && first[14] !== '查看') {
    throw new Error()
  }

  return list.reverse().map(filterData)
}
