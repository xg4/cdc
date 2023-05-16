'use client'

import { RegionCard, Summary, TableCard } from '@/components'
import { House } from '@prisma/client'
import { Empty } from 'antd'
import { orderBy } from 'lodash'

export default function Client({ houses }: { houses: House[] }) {
  const _houses = orderBy(houses, ['endsAt', 'startAt', 'uuid'], ['asc', 'asc', 'asc'])

  return !!houses.length ? (
    <>
      <RegionCard className="m-5" houses={_houses}></RegionCard>
      <Summary className="mx-5 mb-5" houses={_houses}></Summary>
      <TableCard className="mx-5" houses={_houses}></TableCard>
    </>
  ) : (
    <div className="flex items-center justify-center py-10">
      <Empty />
    </div>
  )
}
