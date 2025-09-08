import { DatePicker } from 'antd'
import styled from 'styled-components'

const DatePickerStyled = styled(DatePicker)`
  width: 100%;
`

export default function CustomDatePicker({ size = 'large', ...props }) {
  return <DatePickerStyled size={size} {...props} />
}
