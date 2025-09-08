import { Select } from 'antd'
import styled from 'styled-components'

const SelectStyled = styled(Select)`
  width: 100%;
`

export default function CustomSelect({ size = 'large', ...props }) {
  return <SelectStyled size={size} {...props} />
}
