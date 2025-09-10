import { Spin } from 'antd'
import styled from 'styled-components'

const LazyLoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`

const LazyLoading = () => (
  <LazyLoadingWrapper>
    <Spin size='large' />
  </LazyLoadingWrapper>
)

export default LazyLoading
