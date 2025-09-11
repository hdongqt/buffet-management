import styled from 'styled-components'
import { InputNumber } from 'antd'

const InputStyled = styled(InputNumber)`
  width: 100%;
`

export default function CustomInput({ size = 'large', ...props }) {
  return <InputStyled size={size} {...props} />
}
