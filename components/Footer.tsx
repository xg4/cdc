import { CloudSyncOutlined, GithubOutlined } from '@ant-design/icons'
import { Button, notification } from 'antd'
import { useMutation, useQuery } from 'react-query'
import pkg from '../package.json'
import { getRequestCount, refreshHouses } from '../services'

export default function Nav() {
  const { data, isLoading } = useQuery(getRequestCount.name, getRequestCount)

  const { mutate, isLoading: requestLoading } = useMutation(refreshHouses, {
    onSuccess() {
      notification.success({
        message: '已加入更新队列，请稍后查看',
      })
    },
  })
  return (
    <div className="bg-white py-5">
      <div className="container mx-auto flex items-center justify-center space-x-4">
        {!isLoading && <div>累计查询：{data}次</div>}
        <Button
          loading={requestLoading}
          onClick={() => mutate()}
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
