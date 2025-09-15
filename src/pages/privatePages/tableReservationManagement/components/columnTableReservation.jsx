import { Tooltip, Tag } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'

import DATE_FORMAT from '@/constants/dateTimeFormat'

import { CustomButton } from '@/components/common/ui'

const getStatusColor = (status) => {
  switch (status) {
    case 'confirmed':
      return { color: 'green', label: 'Đã xác nhận' }
    case 'cancelled':
      return { color: 'red', label: 'Đã hủy' }
    default:
      return { color: 'orange', label: 'Chưa xác nhận' }
  }
}

const columnTableReservation = ({ onEdit }) => [
  { title: 'Họ và tên', dataIndex: 'fullname', key: 'fullname' },
  { title: 'Số điện thoại', dataIndex: 'phone', key: 'phone' },
  {
    title: 'Ngày đặt',
    dataIndex: 'reservedAt',
    key: 'reservedAt',
    render: (value) => dayjs(value).format(DATE_FORMAT.FULL_DATE),
  },
  {
    title: 'Giờ đặt',
    dataIndex: 'reservedAt',
    key: 'timeBooking',
    render: (value) => dayjs(value).format(DATE_FORMAT.TIME),
    sorter: (a, b) => dayjs(a.reservedAt) - dayjs(b.reservedAt),
  },
  { title: 'Số khách', dataIndex: 'numPeople', key: 'numPeople' },
  {
    title: 'Số bàn',
    key: 'tableNumber',
    render: (_, record) =>
      record.table?.tableNumber ? `Bàn ${record.table.tableNumber}` : 'Chưa có',
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    key: 'status',
    render: (status) => {
      const { color, label } = getStatusColor(status)
      return <Tag color={color}>{label}</Tag>
    },
    sorter: (a, b) => a.status.localeCompare(b.status),
  },
  {
    title: 'Hành động',
    key: 'action',
    render: (_, record) => {
      return (
        <Tooltip title='Chỉnh sửa'>
          <CustomButton
            icon={<EditOutlined />}
            onClick={() => onEdit?.(record)}
          />
        </Tooltip>
      )
    },
  },
]

export default columnTableReservation
