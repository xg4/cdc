'use client'

import pkg from '../../package.json'

export default function Nav() {
  return (
    <div className="bg-white py-5">
      <div className="container mx-auto text-center text-sm text-gray-500">Version: {pkg.version}</div>
    </div>
  )
}
