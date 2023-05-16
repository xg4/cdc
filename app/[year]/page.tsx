import { getHousesByYear } from '@/server/services'
import dayjs from 'dayjs'
import { HOUSE_YEARS } from '../../constants'
import Client from './client'

export async function generateStaticParams() {
  return HOUSE_YEARS.map(year => ({ year: year.toString() }))
}

export async function generateMetadata({ params }: { params: { year: string } }) {
  return {
    title: `${params.year} 年成都市房源汇总`,
  }
}

export default async function Page({ params }: { params: { year: string } }) {
  const year = Number(params.year)
  const houses = await getHousesByYear(dayjs().year(year))

  return <Client houses={houses} />
}
