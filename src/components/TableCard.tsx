'use client'

import { House } from '@/services'
import { Button, Card, DatePicker, Divider, Form, Input, Table } from 'antd'
import dayjs from 'dayjs'
import { uniqBy } from 'lodash'
import { useEffect, useMemo, useState } from 'react'

interface TableCardProps {
  houses: House[]
  className?: string
}

function FilterForm({ onFilter }: { onFilter: (values: any) => void }) {
  const [form] = Form.useForm()
  return (
    <Form form={form} layout="inline" onFinish={onFilter}>
      <Form.Item label="项目名称" name="name">
        <Input placeholder="请输入项目名称" />
      </Form.Item>
      <Form.Item label="登记时间" name="date">
        <DatePicker.RangePicker showTime={{ format: 'HH:mm' }} format="YYYY-MM-DD HH:mm" />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" type="primary">
          搜索
        </Button>
      </Form.Item>
    </Form>
  )
}

export default function TableCard({ houses, className }: TableCardProps) {
  const [dataSource, setDataSource] = useState(houses)

  useEffect(() => {
    setDataSource(houses)
  }, [houses])

  const onFilter = (values: any) => {
    const { name, date } = values

    let draft = houses
    if (name) {
      draft = draft.filter(house => house.name.includes(name))
    }
    if (date) {
      const [startAt, endAt] = date
      draft = draft.filter(house => startAt.diff(house.startAt) <= 0 && endAt.diff(house.endAt) >= 0)
    }
    setDataSource(draft)
  }

  const columns = useMemo(
    () => [
      {
        title: '区域',
        dataIndex: 'region',
        filters: uniqBy(dataSource, 'region').map(item => ({
          text: item.region,
          value: item.region,
        })),
        onFilter: (value: any, record: any) => record.region.includes(value),
        filterSearch: true,
      },
      {
        title: '项目名称',
        dataIndex: 'name',
      },
      {
        title: '住房套数',
        dataIndex: 'amount',
        sorter(a: any, b: any) {
          return a.amount - b.amount
        },
      },
      {
        title: '登记开始时间',
        dataIndex: 'startAt',
        render(i: string) {
          return dayjs(i).format('YYYY-MM-DD HH:mm:ss')
        },
        sorter(a: any, b: any) {
          return dayjs(a.startAt).diff(b.startAt)
        },
      },
      {
        title: '登记结束时间',
        dataIndex: 'endAt',
        render(i: string) {
          return dayjs(i).format('YYYY-MM-DD HH:mm:ss')
        },
        sorter(a: any, b: any) {
          return dayjs(a.endAt).diff(b.endAt)
        },
      },
    ],
    [dataSource],
  )
  return (
    <Card className={className}>
      <FilterForm onFilter={onFilter} />
      <Divider />
      <Table
        rowKey="uuid"
        columns={columns}
        dataSource={dataSource}
        pagination={{
          showSizeChanger: true,
        }}
      ></Table>
    </Card>
  )
}
