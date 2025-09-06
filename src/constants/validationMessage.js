const VALIDATION_MESSAGE = {
  REQUIRED: (fieldName) => `${fieldName} không được để trống`,
  INVALID_PHONE: 'Số điện thoại không hợp lệ',
  INVALID_TIME: 'Giờ phải trong khoảng từ 10:00 - 20:00',
  INVALID_DATE: 'Ngày không hợp lệ',
  TIME_PAST: 'Không được chọn giờ nhỏ hơn giờ hiện tại',
  MIN_PEOPLE: (min) => `Số khách tối thiểu là ${min}`,
}

export default VALIDATION_MESSAGE
