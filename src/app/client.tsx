'use client'

import ChartCard from '@/components/ChartCard'
import DiffCard from '@/components/DiffCard'
import TableCard from '@/components/TableCard'
import useHouse from '@/hooks/useHouse'
import { House } from '@/services'
import { Col, Row } from 'antd'

export default function Client({ houses }: { houses: House[] }) {
  const {
    currentMonthData,
    currentQuarterData,
    currentWeekData,
    prevMonthData,
    prevQuarterData,
    prevWeekData,
    monthOfData,
    regionOfData,
  } = useHouse(houses)

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
      title: '总量',
      currentData: houses,
      prevData: [],
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

      <TableCard houses={houses} />
    </>
  )
}
