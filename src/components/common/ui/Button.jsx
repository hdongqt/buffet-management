import { Button } from 'antd'
import styled from 'styled-components'

const ButtonStyled = styled(Button)`
  font-weight: 600;
`

export default function CustomButton({ children, ...props }) {
  return <ButtonStyled {...props}>{children}</ButtonStyled>
}
