'use client'

import RegionCard from '@/components/RegionCard'
import Summary from '@/components/Summary'
import TableCard from '@/components/TableCard'
import { House } from '@prisma/client'
import { orderBy } from 'lodash'

export default function Client({ houses }: { houses: Omit<House, 'createdAt' | 'updatedAt' | 'hash'>[] }) {
  const _houses = orderBy(houses, ['endsAt', 'startAt', 'uuid'], ['asc', 'asc', 'asc'])

  return (
    <>
      <RegionCard houses={_houses} />
      <Summary houses={_houses} />
      <TableCard houses={_houses} />
    </>
  )
}
