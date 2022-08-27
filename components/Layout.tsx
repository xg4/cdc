import Footer from '../components/Footer'
import Nav from '../components/Nav'
import { HOUSE_YEARS } from '../constants'

export default function Layout({ children }: { children: React.ReactNode }) {
  const tabs = [{ name: '首页', path: '/' }].concat(
    HOUSE_YEARS.map((year) => ({
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
