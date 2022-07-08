import { Card } from 'antd'
import { Chart, Interaction, Interval, Line, Point, Tooltip } from 'bizcharts'
import { groupBy, orderBy, sumBy } from 'lodash'
import { House } from '../types'

const colors = ['#6394f9', '#62daaa']
const scale = {
  number: {
    alias: '房源数',
  },
  length: {
    alias: '楼盘数',
  },
}

export default function Summary({
  houses,
  className,
}: {
  houses: House[]
  className?: string
}) {
  const regionsOfData = groupBy(houses, 'region')
  const _regionsChart = Object.entries(regionsOfData).map(
    ([region, houses]) => ({
      region,
      length: houses.length,
      number: sumBy(houses, 'quantity'),
    })
  )
  const regionsChart = orderBy(
    _regionsChart,
    ['number', 'length'],
    ['desc', 'desc']
  )

  return (
    <Card title="区域汇总" className={className}>
      <Chart scale={scale} autoFit height={400} data={regionsChart}>
        <Tooltip shared />
        <Interval position="region*number" color={colors[0]} />
        <Line
          position="region*length"
          color={colors[1]}
          size={3}
          shape="smooth"
        />
        <Point
          position="region*length"
          color={colors[1]}
          size={3}
          shape="circle"
        />
        <Interaction type="active-region" />
      </Chart>
    </Card>
  )
}