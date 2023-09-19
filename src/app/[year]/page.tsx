import { getHousesByYear } from '@/server/services'
import { HOUSE_YEARS } from '../../constants'
import { yearParamsSchema } from '../houses/[year]/schema'
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
  const { year } = yearParamsSchema.parse(params)
  const houses = await getHousesByYear(year)

  return <Client houses={houses} />
}
