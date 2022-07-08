import dayjs from 'dayjs'
import { range } from 'lodash'

export function getYears() {
  return range(2017, dayjs().year()).reverse()
}

export * from './request'
