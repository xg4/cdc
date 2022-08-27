import dayjs from 'dayjs'
import { range } from 'lodash'

export const HOUSE_YEARS = range(2017, dayjs().year()).reverse()
