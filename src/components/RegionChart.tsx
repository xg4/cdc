'use client'

import { House } from '@/services'
import { Chart, Interaction, Interval, Tooltip } from 'bizcharts'
import { Dictionary, orderBy, sumBy, uniqBy } from 'lodash'

interface RegionChartProps {
  regionOfData: Dictionary<House[]>
  tabKey: string
}

export default function RegionChart({ regionOfData, tabKey }: RegionChartProps) {
  const _data = Object.entries(regionOfData).map(([region, houses]) => {
    return [
      {
        region: region,
        value: sumBy(houses, 'amount'),
        name: '房源数',
      },
      {
        region: region,
        name: '楼盘数',
        value: uniqBy(houses, 'name').length,
      },
    ]
  })

  const data = orderBy(
    _data.flat().filter(i => i.name === tabKey),
    'value',
    'desc',
  )
  return (
    <div>
      <div className="text-center font-bold">{tabKey} - 区域 - 统计图</div>
      <div className="h-80">
        <Chart padding="auto" data={data} autoFit>
          <Interval
            adjust={[
              {
                type: 'dodge',
                marginRatio: 0,
              },
            ]}
            position="region*value"
            color="name"
          />
          <Tooltip shared />
          <Interaction type="active-region" />
        </Chart>
      </div>
    </div>
  )
}
