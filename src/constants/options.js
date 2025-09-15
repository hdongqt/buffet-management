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
  available: { color: 'green', label: 'Có Sẵn' },
  unavailable: { color: 'red', label: 'Hết món' },
}

const MENU_COMBO_OPTIONS = [
  { value: '', label: 'Mặc định' },
  { value: 'true', label: 'Combo' },
  { value: 'false', label: 'Món lẻ' },
]

const MENU_SOFT_BY = [
  { value: '', label: 'Mặc định' },
  { value: 'name', label: 'Tên' },
  { value: 'price', label: 'Giá' },
  { value: 'createdAt', label: 'Ngày tạo' },
  { value: 'updatedAt', label: 'Ngày cập nhật' },
]

const ORDER_BY = [
  { value: '', label: 'Mặc định' },
  { value: 'asc', label: 'Tăng dần' },
  { value: 'desc', label: 'Giảm dần' },
]

// order
const ORDER_STATUS_OPTIONS = [
  { value: '', label: 'Tất cả' },
  { value: 'pending', label: 'Chờ xử lý' },
  { value: 'confirmed', label: 'Đã Xác Nhận' },
  { value: 'cancelled', label: 'Đã hủy' },
]

const ORDER_STATUS_TAGS = {
  pending: { color: 'yellow', label: 'Chờ xử lý' },
  confirmed: { color: 'green', label: 'Đã Xác Nhận' },
  cancelled: { color: 'red', label: 'Đã hủy' },
  paid: { color: 'blue', label: 'Đã Thanh Toán' },
}

const ORDER_SOFT_BY = [
  { value: 'totalPrice', label: 'Tổng tiền' },
  { value: 'createdAt', label: 'Ngày tạo' },
]

const ORDER_STATUS_UPDATE = [
  { value: 'confirmed', label: 'Xác Nhận', color: 'green' },
  { value: 'cancelled', label: 'Hủy', color: 'red' },
]

const DISH_STATUS_TAGS = {
  pending: { color: 'yellow', label: 'Chờ xử lý' },
  completed: { color: 'green', label: 'Đã hoàn thành' },
  cancelled: { color: 'red', label: 'Đã hủy' },
}

const DISH_STATUS_OPTIONS = [
  { value: '', label: 'Tất cả' },
  { value: 'pending', label: 'Chờ xử lý' },
  { value: 'completed', label: 'Đã hoàn tính' },
  { value: 'cancelled', label: 'Đã hủy' },
]

const PAYMENT_STATUS_TAGS = {
  pending: { color: 'yellow', label: 'Đang chờ thanh toán' },
  completed: { color: 'blue', label: 'Đã thanh toán' },
}

const PAYMENT_METHOD_OPTIONS = [
  { value: 'banking', label: 'Chuyển khoản' },
  { value: 'cash', label: 'Tiền mặt' },
]

const NOTIFICATION_TYPE_OPTIONS = [
  { value: '', label: 'Tất cả', color: '#d9d9d9' },
  { value: 'new_order', label: 'Khách hàng mới', color: '#1890ff' },
  { value: 'order_new_dish', label: 'Gọi món', color: '#faad14' },
  { value: 'payment_request', label: 'Yêu cầu thanh toán', color: '#52c41a' },
  { value: 'staff_call', label: 'Gọi nhân viên', color: '#ff4d4f' },
]

export {
  RESTAURANT_TABLE_OPTION,
  RESTAURANT_TABLE_TAG,
  MENU_STATUS_OPTIONS,
  MENU_STATUS_TAGS,
  MENU_COMBO_OPTIONS,
  MENU_SOFT_BY,
  ORDER_BY,
  ORDER_STATUS_OPTIONS,
  ORDER_SOFT_BY,
  ORDER_STATUS_TAGS,
  ORDER_STATUS_UPDATE,
  DISH_STATUS_TAGS,
  DISH_STATUS_OPTIONS,
  PAYMENT_STATUS_TAGS,
  PAYMENT_METHOD_OPTIONS,
  NOTIFICATION_TYPE_OPTIONS,
}
