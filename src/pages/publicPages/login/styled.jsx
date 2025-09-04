import { Form, Card } from 'antd'
import styled from 'styled-components'
import { theme } from '@/constants/theme'
const { breakpoints } = theme

const StyleCard = styled(Card)`
  width: ${(props) => props.$width}px;

  .ant-card-body {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 4rem 10rem;

    @media screen and (max-width: ${breakpoints.md}) {
      padding: 2rem 5rem;
    }
  }
`

const StyleForm = styled(Form)`
  margin: 4rem 0 2rem;
  width: 100%;
`
export { StyleCard, StyleForm }
