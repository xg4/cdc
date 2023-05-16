import '@/styles/globals.css'
import { Analytics } from '@vercel/analytics/react'
import 'antd/dist/reset.css'
import 'dayjs/locale/zh-cn'
import Footer from '../components/Footer'
import Nav from '../components/Nav'
import Providers from './providers'

export const metadata = {
  title: '成都市房源信息',
  description: '成都市房源信息统计展示',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-cn">
      <Providers>
        <body className="bg-gray-100">
          <Nav />
          <div className="container mx-auto mb-10">{children}</div>
          <Footer />
        </body>
      </Providers>
      <Analytics />
    </html>
  )
}
