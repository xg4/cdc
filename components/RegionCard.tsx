import { Card } from 'antd'
import {
  Chart,
  DonutChart,
  Interaction,
  Interval,
  Line,
  Point,
  Tooltip,
} from 'bizcharts'
import dayjs from 'dayjs'
import { groupBy, orderBy, sumBy } from 'lodash'
import { useState } from 'react'
import Rank from '../components/Rank'
import { House } from '../types'

interface RegionCardProps {
  className?: string
  houses: House[]
}

const colors = ['#6394f9', '#62daaa']
const scale = {
  number: {
    alias: '房源数',
  },
  length: {
    alias: '楼盘数',
  },
}

export default function RegionCard({ houses, className }: RegionCardProps) {
  const regionsOfData = groupBy(houses, 'region')
  const regions = orderBy(
    Object.entries(regionsOfData),
    [
      ([_, houses]) => sumBy(houses, 'quantity'),
      ([_, houses]) => houses.length,
    ],
    ['desc', 'desc']
  ).map(([key]) => key)

  const [tab, setTab] = useState('全部')
  const tabs = ['全部'].concat(regions).map((tab) => ({ key: tab, tab }))
  const _houses = regions.includes(tab) ? regionsOfData[tab] : houses

  const months = groupBy(
    _houses,
    (item) => dayjs(item.startAt).month() + 1 + '月'
  )

  const data = Object.entries(months).map(([key, houses]) => ({
    month: key,
    length: houses.length,
    number: sumBy(houses, 'quantity'),
  }))

  return (
    <Card
      tabList={tabs}
      activeTabKey={tab}
      onTabChange={setTab}
      className={className}
    >
      <div className="flex h-80 justify-between">
        <div className="w-1/2">
          <Chart scale={scale} autoFit data={data}>
            <Tooltip shared />
            <Interval position="month*number" color={colors[0]} />
            <Line
              position="month*length"
              color={colors[1]}
              size={3}
              shape="smooth"
            />
            <Point
              position="month*length"
              color={colors[1]}
              size={3}
              shape="circle"
            />
            <Interaction type="active-region" />
          </Chart>
        </div>
        <div className="w-1/4">
          <DonutChart
            data={data}
            autoFit
            radius={0.8}
            padding="auto"
            angleField="number"
            colorField="month"
            pieStyle={{ stroke: 'white', lineWidth: 5 }}
          />
        </div>
        <Rank
          className="w-1/5"
          dataSource={_houses.map((item, index) => ({
            key: item.name + index,
            name: item.name,
            value: item.quantity,
          }))}
        ></Rank>
      </div>
    </Card>
  )
}
