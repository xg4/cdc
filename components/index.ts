'use client'

import dynamic from 'next/dynamic'

// lazy load large components
export const TableCard = dynamic(() => import('./TableCard'), {
  ssr: false,
})
export const Summary = dynamic(() => import('./Summary'), {
  ssr: false,
})
export const RegionChart = dynamic(() => import('./RegionChart'), {
  ssr: false,
})
export const RegionCard = dynamic(() => import('./RegionCard'), {
  ssr: false,
})
export const MonthChart = dynamic(() => import('./MonthChart'), {
  ssr: false,
})
