import { MENU_STATUS_TAGS } from '@/constants/options'
import REGEX from '@/constants/regex'

const formatCurrency = (value, locale = 'vi-VN', currency = 'VND') => {
  if (typeof value !== 'number') return ''
  return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(
    value
  )
}

const truncateText = (text = '', maxLength = 50) => {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + '…'
}

const getStatusConfig = (status, options) => ({
  color: options[status]?.color ?? 'default',
  label: options[status]?.label ?? status,
})

const formatNumber = (val) => {
  if (val == null) return ''
  return `${val}`.replace(REGEX.PRICE, ',')
}

const parseNumber = (val) => {
  if (!val) return ''
  return val.replace(REGEX.NUMBER, '')
}

export {
  formatCurrency,
  truncateText,
  getStatusConfig,
  formatNumber,
  parseNumber,
}
