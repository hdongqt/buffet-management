import { Button, Result } from 'antd'
import styled from 'styled-components'

const TitleStyled = styled.p`
  font-size: 1.6rem;
`

const ButtonStyled = styled(Button)`
  background-color: var(--ant-main-primary-color);
  &.ant-btn-primary.ant-btn-color-primary:hover {
    background-color: var(--ant-main-secondary-color);
  }
`

export default function NotFound() {
  return (
    <Result
      status='404'
      title='404'
      subTitle={
        <TitleStyled>Sorry, the page you visited does not exist.</TitleStyled>
      }
      extra={
        <ButtonStyled type='primary' href='/' size='large'>
          Back Home
        </ButtonStyled>
      }
    />
  )
}
