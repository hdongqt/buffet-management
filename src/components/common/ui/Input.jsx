import { Input } from 'antd'
import styled from 'styled-components'

const CustomInput = styled(Input)`
  width: 100%;
`

export default function InputStyled({ size = 'large', ...props }) {
  return <CustomInput size={size} {...props} />
}
