import { Col, Row } from 'antd'
import { orderBy } from 'lodash'
import { GetServerSideProps } from 'next'
import { TableCard } from '../components'
import ChartCard from '../components/ChartCard'
import DiffCard from '../components/DiffCard'
import Layout from '../components/Layout'
import useHouse from '../hooks/useHouse'
import { getHouses } from '../services'
import { House } from '../types'
import { NextPageWithLayout } from './_app'

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  )
  const houses = await getHouses()
  return {
    props: {
      houses,
    },
  }
}

const Home: NextPageWithLayout<{ houses: House[] }> = ({ houses }) => {
  const {
    currentMonthData,
    currentQuarterData,
    currentWeekData,
    prevMonthData,
    prevQuarterData,
    prevWeekData,
    monthOfData,
    regionOfData,
    currentYearData,
    prevYearData,
  } = useHouse(houses)

  const dataSource = orderBy(
    houses,
    ['endsAt', 'startAt', 'uuid'],
    ['desc', 'desc', 'asc']
  )

  const diffList = [
    {
      title: '本周',
      extra: '相比上周',
      currentData: currentWeekData,
      prevData: prevWeekData,
    },
    {
      title: '本月',
      extra: '相比上月',
      currentData: currentMonthData,
      prevData: prevMonthData,
    },
    {
      title: '本季',
      extra: '相比上季',
      currentData: currentQuarterData,
      prevData: prevQuarterData,
    },
    {
      title: '今年',
      extra: '相比去年',
      currentData: currentYearData,
      prevData: prevYearData,
    },
  ]

  return (
    <main>
      <Row gutter={16} className="my-5 px-5">
        {diffList.map((item) => {
          return (
            <Col key={item.title} span={6}>
              <DiffCard {...item}></DiffCard>
            </Col>
          )
        })}
      </Row>

      <ChartCard
        className="mx-5 mb-5"
        monthOfData={monthOfData}
        regionOfData={regionOfData}
      ></ChartCard>

      <TableCard className="mx-5" dataSource={dataSource}></TableCard>
    </main>
  )
}

Home.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}

export default Home
