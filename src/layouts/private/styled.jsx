import { Layout } from 'antd'
import styled from 'styled-components'

const PrivateLayoutStyle = styled(Layout)`
  min-height: 100vh;

  .home-layout__content {
    background: #f1f4ff;
    border-radius: 8px;
  }
`

const ContentStyle = styled('div')`
  padding: 24px;
  margin: 24px;
  background: #fff;
  min-height: calc(100vh - 88px);
`

export { PrivateLayoutStyle, ContentStyle }
