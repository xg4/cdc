import { getTzDate } from '@/utils/time'
import { JSDOM } from 'jsdom'
import { z } from 'zod'
import buildUrl from './buildUrl'

export const houseInputSchema = z.object({
  uuid: z.string(),
  region: z.string(),
  name: z.string(),
  amount: z.coerce.number().int(),
  scope: z.string(),
  startAt: z
    .string()
    .transform(v => getTzDate(v))
    .refine(d => d.isValid())
    .transform(d => d.toDate()),
  endAt: z
    .string()
    .transform(v => getTzDate(v))
    .refine(d => d.isValid())
    .transform(d => d.toDate()),
  status: z.string(),
})

function transformData([uuid, , region, name, , scope, amount, , startAt, endAt, , , , status, text]: any[]) {
  z.string()
    .refine(s => s === '查看')
    .parse(text)
  return houseInputSchema.parse({
    uuid,
    region,
    name,
    amount,
    scope,
    startAt,
    endAt,
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

  return parseHtml(result).map(transformData).reverse()
}
