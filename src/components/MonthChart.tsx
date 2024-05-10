'use client'

import { House } from '@/services'
import { Chart, LineAdvance } from 'bizcharts'
import { Dictionary, orderBy, sumBy, unionBy } from 'lodash'
import Rank from './Rank'

interface MonthChartProps {
  monthOfData: Dictionary<House[]>
  tabKey: string
}

export default function MonthChart({ monthOfData, tabKey }: MonthChartProps) {
  const _data = Object.entries(monthOfData).map(([key, houses]) => [
    {
      name: '房源数',
      month: key,
      value: sumBy(houses, 'amount'),
    },
    {
      name: '楼盘数',
      month: key,
      value: unionBy(houses, 'name').length,
    },
  ])
  const data = orderBy(
    _data.flat().filter(i => i.name === tabKey),
    'month',
    'asc',
  )

  return (
    <div>
      <div className="text-center font-bold">{tabKey} - 月份 - 统计图</div>
      <div className="flex h-80 justify-between overflow-hidden">
        <div className="w-3/4">
          <Chart autoFit data={data}>
            <LineAdvance shape="smooth" point area position="month*value" color="name" />
          </Chart>
        </div>
        <Rank
          className="w-1/5"
          title="排名：月份"
          dataSource={data.map(item => ({
            ...item,
            name: item.month,
            key: item.month,
          }))}
        ></Rank>
      </div>
    </div>
  )
}
