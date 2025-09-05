import { DatePicker } from 'antd'
import styled from 'styled-components'

const CustomDatePicker = styled(DatePicker)`
  width: 100%;
`

export default function DatePickerStyled({ size = 'large', ...props }) {
  return <CustomDatePicker size={size} {...props} />
}
