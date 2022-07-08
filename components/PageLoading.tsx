import { Spin } from 'antd'

export default function PageLoading() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <Spin size="large" />
    </div>
  )
}
