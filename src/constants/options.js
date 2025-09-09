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

// menu
const MENU_STATUS_OPTIONS = [
  { label: 'Có Sẵn', value: 'available' },
  { label: 'Hết món', value: 'unavailable' },
]

const MENU_STATUS_TAGS = {
  available: { color: 'green', label: 'available' },
  unavailable: { color: 'red', label: 'unavailable' },
}

const MENU_COMBO_OPTIONS = [
  { value: true, label: 'Combo' },
  { value: false, label: 'Món lẻ' },
]

const MENU_SOFT_BY = [
  { value: 'name', label: 'Tên' },
  { value: 'price', label: 'Giá' },
  { value: 'createdAt', label: 'Ngày tạo' },
  { value: 'updatedAt', label: 'Ngày cập nhật' },
]

const MENU_ORDER_BY = [
  { value: 'asc', label: 'Tăng dần' },
  { value: 'desc', label: 'Giảm dần' },
]

export {
  MENU_STATUS_OPTIONS,
  MENU_STATUS_TAGS,
  MENU_COMBO_OPTIONS,
  MENU_SOFT_BY,
  MENU_ORDER_BY,
}

export { RESTAURANT_TABLE_OPTION, RESTAURANT_TABLE_TAG }
