'use client'

import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons'
import { Avatar, Button, List } from 'antd'
import classNames from 'classnames'
import { orderBy } from 'lodash'
import { useState } from 'react'

interface RankProps {
  className?: string
  title?: string
  dataSource: {
    key: string
    name: string
    value: number
  }[]
  rowKey?: string
}

export default function Rank({ dataSource, className, title }: RankProps) {
  const [order, setOrder] = useState<'desc' | 'asc'>('desc')

  return (
    <List
      bordered
      itemLayout="vertical"
      className={classNames(className, 'overflow-auto')}
      header={
        <div className="flex items-center justify-between">
          <span>{title ?? '排名'}</span>

          <Button
            onClick={() => {
              if (order === 'desc') {
                setOrder('asc')
              } else {
                setOrder('desc')
              }
            }}
            type="link"
            icon={order === 'desc' ? <ArrowDownOutlined /> : <ArrowUpOutlined />}
          ></Button>
        </div>
      }
      size="small"
      dataSource={orderBy(dataSource, 'value', order)}
      renderItem={(item, index) => (
        <List.Item>
          <List.Item.Meta
            avatar={
              <Avatar className={classNames({ '!bg-blue-500': index < 3 })} size="small">
                {index + 1}
              </Avatar>
            }
            title={<span className="text-sm">{item.name}</span>}
            description={item.value}
          />
        </List.Item>
      )}
    ></List>
  )
}
