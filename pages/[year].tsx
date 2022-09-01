import { House } from '@prisma/client'
import { Empty } from 'antd'
import dayjs from 'dayjs'
import { orderBy } from 'lodash'
import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'
import { RegionCard, Summary, TableCard } from '../components'
import Layout from '../components/Layout'
import { HOUSE_YEARS } from '../constants'
import { getHousesByYear } from '../services/server'
import { NextPageWithLayout } from './_app'

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = HOUSE_YEARS.map((year) => {
    return {
      params: {
        year: year.toString(),
      },
    }
  })

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params) {
    return {
      props: {
        houses: [],
      },
    }
  }

  const year = Number(params.year)
  const houses = await getHousesByYear(dayjs().year(year))

  return {
    props: {
      houses: JSON.parse(JSON.stringify(houses)),
    },
  }
}

const YearDetail: NextPageWithLayout<{ houses: House[] }> = (props) => {
  const router = useRouter()
  const { year } = router.query

  const houses = orderBy(
    props.houses,
    ['endsAt', 'startAt', 'uuid'],
    ['asc', 'asc', 'asc']
  )

  const title = `${year} 年成都市房源汇总`

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      {!!houses.length ? (
        <>
          <RegionCard className="m-5" houses={houses}></RegionCard>
          <Summary className="mx-5 mb-5" houses={houses}></Summary>
          <TableCard className="mx-5" houses={houses}></TableCard>
        </>
      ) : (
        <div className="flex items-center justify-center py-10">
          <Empty />
        </div>
      )}
    </>
  )
}

YearDetail.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default YearDetail
