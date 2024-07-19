'use client'

import { HOUSE_YEARS } from '@/constants'
import classNames from 'classnames'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Nav() {
  const links = [{ name: '首页', href: '/' }].concat(
    HOUSE_YEARS.map(year => ({
      name: `${year}年`,
      href: `/${year}`,
    })),
  )
  const pathname = usePathname()

  return (
    <nav className="bg-white">
      <div className="container mx-auto flex items-center justify-between">
        <ul className="m-0 flex list-none p-0">
          {links.map(link => {
            const isActive = pathname === link.href

            return (
              <li className="p-4" key={link.name}>
                <Link
                  className={classNames(isActive ? 'text-blue-500' : 'text-gray-800', 'text-sm no-underline')}
                  href={link.href}
                >
                  {link.name}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}
