'use client'

import ChartCard from '@/components/ChartCard'
import DiffCard from '@/components/DiffCard'
import TableCard from '@/components/TableCard'
import useHouse from '@/hooks/useHouse'
import { getLatestHouses } from '@/services'
import { House } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import { Col, Row } from 'antd'
import { orderBy, uniqBy } from 'lodash'

export default function Client({ houses }: { houses: House[] }) {
  const { data: latestHouses } = useQuery(['getLatestHouses'], getLatestHouses, {
    initialData: houses,
  })

  const newHouses = uniqBy([...latestHouses, ...houses], 'uuid')
  const dataSource = orderBy(newHouses, ['id'], ['desc'])
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
  } = useHouse(dataSource)

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
    <>
      <Row gutter={16}>
        {diffList.map(item => {
          return (
            <Col key={item.title} span={6}>
              <DiffCard {...item}></DiffCard>
            </Col>
          )
        })}
      </Row>

      <ChartCard monthOfData={monthOfData} regionOfData={regionOfData} />

      <TableCard houses={dataSource} />
    </>
  )
}
