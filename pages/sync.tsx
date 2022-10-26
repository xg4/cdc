import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { refreshHouses } from '../services'

export default function Sync() {
  const [page, setPage] = useState(300)
  const { isLoading } = useQuery(
    ['refreshHouses', page],
    () => refreshHouses(page),
    {
      onSettled() {
        if (page <= 1) {
          return
        }
        setPage((p) => p - 1)
      },
    }
  )
  return <div>{isLoading ? '同步中...' : '同步结束'}</div>
}
