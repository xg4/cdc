import { Prisma } from '@prisma/client'
import { load } from 'cheerio'
import { SHA256 } from 'crypto-js'
import { head } from 'lodash'
import { getTzDate } from '../utils'

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
    startAt: getTzDate(startAt),
    endsAt: getTzDate(endsAt),
    freezeDate: freezeDate ? getTzDate(freezeDate) : null,
    freeze2Date: freeze2Date ? getTzDate(freeze2Date) : null,
    qualificationDate: qualificationDate ? getTzDate(qualificationDate) : null,
    status,
  }
  return {
    ...house,
    hash: SHA256(Object.values(house).toString()).toString(),
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
