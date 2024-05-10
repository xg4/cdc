import { House } from '@/services'
import dayjs from 'dayjs'
import { groupBy } from 'lodash'
import { useMemo } from 'react'

export default function useHouse(data: House[]) {
  return useMemo(() => {
    const yearOfData = groupBy(data, item => dayjs(item.startAt).get('year'))
    const monthOfData = groupBy(data, item => dayjs(item.startAt).format('YYYY-MM'))
    const quarterOfData = groupBy(data, item => {
      const d = dayjs(item.startAt)
      return [d.get('year'), d.quarter()].join('-')
    })

    const weekOfData = groupBy(data, item => {
      const d = dayjs(item.startAt)
      return [d.weekYear(), d.week()].join('-')
    })

    const currentDate = dayjs()

    const prevWeek = currentDate.subtract(1, 'week')
    const currentWeekData = weekOfData[[currentDate.weekYear(), currentDate.week()].join('-')] ?? []
    const prevWeekData = weekOfData[[prevWeek.weekYear(), prevWeek.week()].join('-')] ?? []

    const prevQuarter = currentDate.subtract(1, 'quarter')
    const currentQuarterData = quarterOfData[[currentDate.get('year'), currentDate.quarter()].join('-')] ?? []
    const prevQuarterData = quarterOfData[[prevQuarter.get('year'), prevQuarter.quarter()].join('-')] ?? []

    const prevMonth = currentDate.subtract(1, 'month')
    const currentMonthData = monthOfData[currentDate.format('YYYY-MM')] ?? []
    const prevMonthData = monthOfData[prevMonth.format('YYYY-MM')] ?? []

    const regionOfData = groupBy(data, 'region')
    return {
      currentWeekData,
      prevWeekData,
      currentQuarterData,
      prevQuarterData,
      currentMonthData,
      prevMonthData,
      yearOfData,
      monthOfData,
      quarterOfData,
      regionOfData,
    }
  }, [data])
}
