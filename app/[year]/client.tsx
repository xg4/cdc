'use client'

import RegionCard from '@/components/RegionCard'
import Summary from '@/components/Summary'
import TableCard from '@/components/TableCard'
import { House } from '@prisma/client'
import { Empty } from 'antd'
import { orderBy } from 'lodash'

export default function Client({ houses }: { houses: House[] }) {
  const _houses = orderBy(houses, ['endsAt', 'startAt', 'uuid'], ['asc', 'asc', 'asc'])

  return !!houses.length ? (
    <>
      <RegionCard className="m-5" houses={_houses} />
      <Summary className="mx-5 mb-5" houses={_houses} />
      <TableCard className="mx-5" houses={_houses} />
    </>
  ) : (
    <div className="flex items-center justify-center py-10">
      <Empty />
    </div>
  )
}
