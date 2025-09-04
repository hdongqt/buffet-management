import { Select } from 'antd'
import styled from 'styled-components'

const CustomSelect = styled(Select)`
  width: 100%;
`

export default function SelectStyled({ size = 'large', ...props }) {
  return <CustomSelect size={size} {...props} />
}
