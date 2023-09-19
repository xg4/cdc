import { JSDOM } from 'jsdom'
import { head } from 'lodash'
import { z } from 'zod'
import buildUrl from './buildUrl'
import { getTzDate } from './time'

export const houseInputSchema = z.object({
  uuid: z.string(),
  region: z.string(),
  name: z.string(),
  amount: z.coerce.number().int(),
  scope: z.string(),
  startAt: z.date(),
  endAt: z.date(),
  status: z.string(),
})

function filterData([uuid, , region, name, , scope, amount, , startAt, endAt, , , , status]: any[]) {
  return houseInputSchema.parse({
    uuid,
    region,
    name,
    amount,
    scope,
    startAt: getTzDate(startAt),
    endAt: getTzDate(endAt),
    status,
  })
}

function parseHtml(htmlStr: string) {
  const {
    window: { document },
  } = new JSDOM(htmlStr)
  return Array.from(document.querySelectorAll<HTMLTableRowElement>('#_projectInfo > tr')).map(tr =>
    Array.from(tr.children).map(td => td.textContent),
  )
}

export async function pull(pageNo = 1) {
  const url = buildUrl(process.env.API_URL!, {
    pageNo,
  })
  const result = await fetch(url, {
    method: 'POST',
  }).then(res => res.text())

  const list = parseHtml(result)
  const first = head(list)
  if (!first || first[14] !== '查看') {
    throw new Error()
  }

  return list.reverse().map(filterData)
}
