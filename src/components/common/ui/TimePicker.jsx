import { TimePicker } from 'antd'
import styled from 'styled-components'

const CustomTimePicker = styled(TimePicker)`
  width: 100%;
`

export default function TimePickerStyled({ size = 'large', ...props }) {
  return <CustomTimePicker size={size} {...props} />
}
