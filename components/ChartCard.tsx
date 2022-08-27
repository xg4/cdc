import { House } from '@prisma/client'
import { Card, Divider } from 'antd'
import { Dictionary } from 'lodash'
import { useState } from 'react'
import { MonthChart, RegionChart } from './'

const tabList = [
  {
    key: '房源数',
    tab: '房源数',
  },
  {
    key: '楼盘数',
    tab: '楼盘数',
  },
]

interface ChartCardProps {
  regionOfData: Dictionary<House[]>
  monthOfData: Dictionary<House[]>
  className?: string
}

export default function ChartCard({
  monthOfData,
  regionOfData,
  className,
}: ChartCardProps) {
  const [tabKey, setTabKey] = useState('房源数')
  return (
    <Card
      className={className}
      activeTabKey={tabKey}
      onTabChange={setTabKey}
      tabList={tabList}
    >
      <MonthChart tabKey={tabKey} monthOfData={monthOfData}></MonthChart>
      <Divider></Divider>
      <RegionChart tabKey={tabKey} regionOfData={regionOfData}></RegionChart>
    </Card>
  )
}
