'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import quarterOfYear from 'dayjs/plugin/quarterOfYear'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import weekYear from 'dayjs/plugin/weekYear'
import { noop } from 'lodash'
import { PropsWithChildren, useState } from 'react'

dayjs.locale('zh-cn')
const plugins = [quarterOfYear, weekOfYear, weekYear]
plugins.forEach(plugin => dayjs.extend(plugin))

export default function Providers({ children }: PropsWithChildren) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retry: false,
          },
        },
        logger: {
          error: noop,
          warn: noop,
          log: noop,
        },
      }),
  )
  return (
    <ConfigProvider locale={zhCN}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </ConfigProvider>
  )
}
