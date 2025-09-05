import { Form, Card } from 'antd'
import styled from 'styled-components'
import { theme } from '@/constants/theme'
const { breakpoints } = theme

const Login = {
  Card: styled(Card)`
    width: ${(props) => props.$width}px;

    .ant-card-body {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 40px 100px;

      @media screen and (max-width: ${breakpoints.md}) {
        padding: 20px 50px;
      }
    }
  `,

  Form: styled(Form)`
    margin: 40px 0 20px;
    width: 100%;
  `,
}

export { Login }
