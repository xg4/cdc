import { Button, Card, Divider, Form, Input, Table } from 'antd'
import dayjs from 'dayjs'
import { join, map, pipe, sortBy, uniqBy } from 'lodash/fp'
import { useMemo } from 'react'
import { useUpdate } from 'react-use'
import { House } from '../types'
import DatePicker from './DatePicker'

interface TableCardProps {
  dataSource: House[]
  className?: string
}

export default function TableCard({
  dataSource: _data,
  className,
}: TableCardProps) {
  const [form] = Form.useForm()

  const update = useUpdate()

  const dataSource = _data
    .filter((i) => i.name.includes(form.getFieldValue('name') ?? ''))
    .filter((i) => {
      const [startAt, endsAt] = form.getFieldValue('date') ?? []
      if (startAt && endsAt) {
        return startAt.diff(i.startAt) <= 0 && endsAt.diff(i.endsAt) >= 0
      }
      if (startAt) {
        return startAt.diff(i.startAt) <= 0
      }
      if (endsAt) {
        return endsAt.diff(i.endsAt) >= 0
      }
      return true
    })
  const ids = pipe(sortBy('id'), map('id'), join(','))(dataSource)

  const columns = useMemo(
    () => [
      {
        title: '区域',
        dataIndex: 'region',
        filters: pipe(
          uniqBy('region'),
          map((item: House) => ({
            text: item.region,
            value: item.region,
          }))
        )(dataSource),
        onFilter: (value: any, record: House) => record.region.includes(value),
        filterSearch: true,
      },
      {
        title: '项目名称',
        dataIndex: 'name',
      },
      {
        title: '住房套数',
        dataIndex: 'quantity',
        sorter(a: House, b: House) {
          return a.quantity - b.quantity
        },
      },
      {
        title: '登记开始时间',
        dataIndex: 'startAt',
        render(i: string) {
          return dayjs(i).format('YYYY-MM-DD HH:mm:ss')
        },
        sorter(a: House, b: House) {
          return dayjs(a.startAt).diff(b.startAt)
        },
      },
      {
        title: '登记结束时间',
        dataIndex: 'endsAt',
        render(i: string) {
          return dayjs(i).format('YYYY-MM-DD HH:mm:ss')
        },
        sorter(a: House, b: House) {
          return dayjs(a.endsAt).diff(b.endsAt)
        },
      },
      {
        title: '报名状态',
        dataIndex: 'status',
        filters: pipe(
          uniqBy('status'),
          map((item: House) => ({
            text: item.status,
            value: item.status,
          }))
        )(dataSource),
        onFilter: (value: any, record: House) => record.status.includes(value),
        filterSearch: true,
      },
    ],
    [ids]
  )
  return (
    <Card className={className}>
      <Form form={form} layout="inline" onFinish={update}>
        <Form.Item label="项目名称" name="name">
          <Input placeholder="请输入项目名称" />
        </Form.Item>
        <Form.Item label="登记时间" name="date">
          <DatePicker.RangePicker
            showTime={{ format: 'HH:mm' }}
            format="YYYY-MM-DD HH:mm"
          />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" type="primary">
            搜索
          </Button>
        </Form.Item>
      </Form>
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
