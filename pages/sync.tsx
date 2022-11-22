import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { refreshHouses } from '../services'

export default function Sync() {
  const [page, setPage] = useState(1)
  const { isLoading } = useQuery(
    ['refreshHouses', page],
    () => refreshHouses(page),
    {
      onSuccess() {
        setPage((p) => p + 1)
      },
    }
  )
  return <div>{isLoading ? '同步中...' : '同步结束'}</div>
}
