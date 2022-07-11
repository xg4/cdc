import { ConfigProvider } from 'antd'
import 'antd/dist/antd.min.css'
import zhCN from 'antd/lib/locale/zh_CN'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import quarterOfYear from 'dayjs/plugin/quarterOfYear'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import weekYear from 'dayjs/plugin/weekYear'
import { noop } from 'lodash'
import { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { ReactElement, ReactNode, useState } from 'react'
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
  setLogger,
} from 'react-query'
import '../styles/tailwind.css'

dayjs.locale('zh-cn')
const plugins = [quarterOfYear, weekOfYear, weekYear]
plugins.forEach((plugin) => dayjs.extend(plugin))

export type NextPageWithLayout<P = {}> = NextPage<P> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

setLogger({
  log: noop,
  warn: noop,
  error: noop,
})

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retry: false,
          },
        },
      })
  )
  const getLayout = Component.getLayout ?? ((page) => page)
  return (
    <ConfigProvider locale={zhCN}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          {getLayout(<Component {...pageProps} />)}
        </Hydrate>
      </QueryClientProvider>
    </ConfigProvider>
  )
}

export default MyApp
