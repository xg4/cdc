'use client'

import RegionCard from '@/components/RegionCard'
import Summary from '@/components/Summary'
import TableCard from '@/components/TableCard'
import { House } from '@/services'

export default function Client({ houses }: { houses: House[] }) {
  return (
    <>
      <RegionCard houses={houses} />
      <Summary houses={houses} />
      <TableCard houses={houses} />
    </>
  )
}
