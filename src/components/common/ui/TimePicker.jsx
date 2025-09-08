import { TimePicker } from 'antd'
import styled from 'styled-components'

const TimePickerStyled = styled(TimePicker)`
  width: 100%;
`

export default function CustomTimePicker({ size = 'large', ...props }) {
  return <TimePickerStyled size={size} {...props} />
}
