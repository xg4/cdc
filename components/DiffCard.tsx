'use client'

import { House } from '@prisma/client'
import { Card } from 'antd'
import { sumBy } from 'lodash'

interface DiffCardProps {
  title: string
  extra?: string
  currentData: House[]
  prevData: House[]
}

export default function DiffCard({ title, extra, currentData, prevData }: DiffCardProps) {
  const currentNum = currentData.length
  const prevNum = prevData.length
  const diffNum = currentNum - prevNum

  const currentNum2 = sumBy(currentData, 'quantity')

  const prevNum2 = sumBy(prevData, 'quantity')
  const diffNum2 = currentNum2 - prevNum2

  return (
    <Card title={title} extra={<span className="text-xs">{extra}</span>}>
      <div className="flex justify-between">
        <span>
          楼盘数：
          {currentNum}
        </span>

        {extra && <span className={diffNum < 0 ? 'text-green-500' : 'text-red-500'}>{diffNum}</span>}
      </div>

      <div className="flex justify-between">
        <span>
          房源数：
          {currentNum2}
        </span>

        {extra && <span className={diffNum2 < 0 ? 'text-green-500' : 'text-red-500'}>{diffNum2}</span>}
      </div>
    </Card>
  )
}
