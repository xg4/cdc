'use client'

import { useRouter } from 'next/router'
import React from 'react'

export interface NavLinkProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'className' | 'style' | 'children' | 'href'> {
  href: string
  className?: string | ((props: { isActive: boolean }) => string)
  style?: React.CSSProperties | ((props: { isActive: boolean }) => React.CSSProperties)
  children?: React.ReactNode | ((props: { isActive: boolean }) => React.ReactNode)
}

const NavLink = React.forwardRef<HTMLAnchorElement, NavLinkProps>(function NavLinkWithRef(
  { 'aria-current': _ariaCurrent = 'page', className: _className, style: _style, href, children, ...rest },
  ref,
) {
  const router = useRouter()

  const isActive = router.asPath === href

  const handleClick: React.MouseEventHandler<HTMLAnchorElement> = evt => {
    evt.preventDefault()
    router.push(href)
  }

  const className = typeof _className === 'function' ? _className({ isActive }) : _className

  const style = typeof _style === 'function' ? _style({ isActive }) : _style

  const ariaCurrent = isActive ? _ariaCurrent : undefined

  return (
    <a
      {...rest}
      ref={ref}
      aria-current={ariaCurrent}
      href={href}
      className={className}
      onClick={handleClick}
      style={style}
    >
      {typeof children === 'function' ? children({ isActive }) : children}
    </a>
  )
})

export default NavLink
