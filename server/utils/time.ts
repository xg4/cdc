import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

const plugins = [utc, timezone]
plugins.forEach((p) => dayjs.extend(p))

export function getTzDate(date: string) {
  return dayjs.tz(date, 'Asia/Shanghai').toDate()
}
