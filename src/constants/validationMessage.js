const VALIDATION_MESSAGE = {
  REQUIRED: (fieldName) => `${fieldName} không được để trống`,
  INVALID_PHONE: 'Số điện thoại không hợp lệ',
  INVALID_TIME: 'Giờ phải trong khoảng từ 10:00 - 20:00',
  INVALID_DATE: 'Ngày không hợp lệ',
  TIME_PAST: 'Không được chọn giờ nhỏ hơn giờ hiện tại',
  MIN_PEOPLE: (min) => `Số khách tối thiểu là ${min}`,
  INVALID_TABLE_NUMBER: 'Số bàn không hợp lệ',
  INVALID_TABLE_CAPACITY: 'Chỗ ngồi không hợp lệ',
  MIN_NUMBER: (fieldName, min) => `${fieldName} phải ≥ ${min}`,
  MAX_NUMBER: (fieldName, max) => `${fieldName} phải ≤ ${max}`,
  MIN_LENGTH: (fieldName, min) => `${fieldName} phải có ít nhất ${min} ký tự`,
  MAX_LENGTH: (fieldName, max) => `${fieldName} không quá ${max} ký tự`,
  INVALID_URL: 'URL không hợp lệ',
}

export default VALIDATION_MESSAGE
