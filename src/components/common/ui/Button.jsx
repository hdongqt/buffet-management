import { Button } from 'antd'
import styled from 'styled-components'

const CustomButton = styled(Button)`
  font-weight: 600;
  height: 44px;

  @media (max-width: 768px) {
    width: 100%;
  }
`

export default function ButtonStyled({ children, ...props }) {
  return <CustomButton {...props}>{children}</CustomButton>
}
