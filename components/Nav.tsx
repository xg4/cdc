import { GithubOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import classNames from 'classnames'
import pkg from '../package.json'
import NavLink from './NavLink'

interface NavProps {
  links: { name: string; path: string }[]
}

export default function Nav({ links }: NavProps) {
  return (
    <nav className="bg-white">
      <div className="container mx-auto flex items-center justify-between">
        <ul className="m-0 flex list-none p-0">
          {links.map((link) => (
            <li className="p-4" key={link.name}>
              <NavLink
                className={({ isActive }) =>
                  classNames(
                    isActive ? 'text-blue-500' : 'text-gray-800',
                    'no-underline'
                  )
                }
                href={link.path}
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>

        <Button
          href={pkg.homepage}
          target="_blank"
          type="link"
          icon={<GithubOutlined className="text-xl text-gray-700" />}
        ></Button>
      </div>
    </nav>
  )
}
