import { RESTAURANT_TABLE_STATUS } from './status'

// restaurant table
const RESTAURANT_TABLE_OPTION = [
  { label: 'Tất cả', value: '' },
  { label: 'Có sẵn', value: RESTAURANT_TABLE_STATUS.AVAILABLE },
  { label: 'Có khách', value: RESTAURANT_TABLE_STATUS.OCCUPIED },
  { label: 'Đã được đặt', value: RESTAURANT_TABLE_STATUS.RESERVED },
  { label: 'Tạm ngưng', value: RESTAURANT_TABLE_STATUS.DISABLED },
]

const RESTAURANT_TABLE_TAG = {
  [RESTAURANT_TABLE_STATUS.AVAILABLE]: {
    text: 'Có sẵn',
    color: 'green',
  },
  [RESTAURANT_TABLE_STATUS.OCCUPIED]: {
    text: 'Có khách',
    color: 'blue',
  },
  [RESTAURANT_TABLE_STATUS.RESERVED]: {
    text: 'Đã được đặt',
    color: 'orange',
  },
  [RESTAURANT_TABLE_STATUS.DISABLED]: {
    text: 'Tạm ngưng',
    color: 'red',
  },
}

export { RESTAURANT_TABLE_OPTION, RESTAURANT_TABLE_TAG }
