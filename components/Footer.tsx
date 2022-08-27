import { CloudSyncOutlined, GithubOutlined } from '@ant-design/icons'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Button, notification } from 'antd'
import { ary } from 'lodash'
import pkg from '../package.json'
import { getRequestCount, refreshHouses } from '../services'

export default function Nav() {
  const { data, isLoading } = useQuery(['getRequestCount'], getRequestCount)

  const { mutate, isLoading: requestLoading } = useMutation(refreshHouses, {
    onSuccess(message) {
      notification.success({
        message,
      })
    },
  })
  return (
    <div className="bg-white py-5">
      <div className="container mx-auto flex items-center justify-center space-x-4">
        {!isLoading && <div>累计查询：{data}次</div>}
        <Button
          loading={requestLoading}
          onClick={ary(mutate, 0)}
          type="link"
          icon={<CloudSyncOutlined className="text-xl text-gray-700" />}
        ></Button>
        <Button
          href={pkg.homepage}
          target="_blank"
          type="link"
          icon={
            <GithubOutlined className="text-xl text-gray-700"></GithubOutlined>
          }
        ></Button>
      </div>
    </div>
  )
}
