import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Analytics } from '@vercel/analytics/react'
import { ConfigProvider } from 'antd'
import 'antd/dist/reset.css'
import zhCN from 'antd/locale/zh_CN'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import quarterOfYear from 'dayjs/plugin/quarterOfYear'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import weekYear from 'dayjs/plugin/weekYear'
import { noop } from 'lodash'
import { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { ReactElement, ReactNode, useState } from 'react'
import '../styles/tailwind.css'

dayjs.locale('zh-cn')
const plugins = [quarterOfYear, weekOfYear, weekYear]
plugins.forEach(plugin => dayjs.extend(plugin))

export type NextPageWithLayout<P = {}> = NextPage<P> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

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
        logger: {
          error: noop,
          warn: noop,
          log: noop,
        },
      }),
  )
  const getLayout = Component.getLayout ?? (page => page)
  return (
    <>
      <ConfigProvider theme={{ token: { borderRadius: 2 } }} locale={zhCN}>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>{getLayout(<Component {...pageProps} />)}</Hydrate>
        </QueryClientProvider>
      </ConfigProvider>
      <Analytics />
    </>
  )
}

export default MyApp
