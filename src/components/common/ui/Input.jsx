import { Input } from 'antd'
import styled from 'styled-components'

const InputStyled = styled(Input)`
  width: 100%;
`

export default function CustomInput({ size = 'large', ...props }) {
  return <InputStyled size={size} {...props} />
}
