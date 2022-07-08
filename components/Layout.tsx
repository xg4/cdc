import Footer from '../components/Footer'
import Nav from '../components/Nav'
import { getYears } from '../helpers'

export default function Layout({ children }: { children: React.ReactNode }) {
  const tabs = [{ name: '首页', path: '/' }].concat(
    getYears().map((year) => ({
      name: `${year}年`,
      path: `/${year}`,
    }))
  )

  return (
    <div className="bg-gray-100">
      <Nav links={tabs}></Nav>
      <div className="container mx-auto mb-10">{children}</div>
      <Footer />
    </div>
  )
}
