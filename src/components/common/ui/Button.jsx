import { Button } from 'antd'
import styled from 'styled-components'

const ButtonStyled = styled(Button)`
  font-weight: 600;
  width: ${(props) => (props.$fullWidth ? '100%' : 'auto')};
`

export default function CustomButton({ children, fullWidth, ...props }) {
  return (
    <ButtonStyled {...props} $fullWidth={fullWidth}>
      {children}
    </ButtonStyled>
  )
}
