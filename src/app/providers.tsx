'use client'

import { ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import quarterOfYear from 'dayjs/plugin/quarterOfYear'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import weekYear from 'dayjs/plugin/weekYear'
import { PropsWithChildren } from 'react'

dayjs.locale('zh-cn')
const plugins = [quarterOfYear, weekOfYear, weekYear]
plugins.forEach(plugin => dayjs.extend(plugin))

export default function Providers({ children }: PropsWithChildren) {
  return <ConfigProvider locale={zhCN}>{children}</ConfigProvider>
}
