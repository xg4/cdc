import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { notification } from 'antd'
import pkg from '../package.json'
import { getRequestCount, refreshHouses } from '../services'

export default function Nav() {
  const { data, isLoading } = useQuery(['getRequestCount'], getRequestCount)
  const queryClient = useQueryClient()
  const { mutate, isLoading: requestLoading } = useMutation(refreshHouses, {
    onSuccess(message) {
      notification.success({
        message,
      })
      queryClient.refetchQueries(['getLatestHouses'])
      queryClient.refetchQueries(['getRequestCount'])
    },
  })
  return (
    <div className="bg-white py-5">
      <div className="container mx-auto text-center text-sm text-gray-500">
        Version: {pkg.version}
      </div>
    </div>
  )
}
