import { Flex } from 'antd'
import { List } from 'antd'
import styled from 'styled-components'

const StyledList = styled(List)`
  max-height: 700px;
  overflow-y: auto;
  flex: 1;
`

const StyledFlex = styled(Flex)`
  flex: 1;
`

export { StyledList, StyledFlex }
