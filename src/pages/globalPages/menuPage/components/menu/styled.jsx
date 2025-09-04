import styled from 'styled-components'
import background from '@/assets/images/Background.jpg'
import { Flex } from 'antd'

const StyledMenu = styled.section`
  position: relative;
  z-index: 1;
  padding: 8rem 2rem 2rem;

  display: flex;
  flex-direction: column;
  gap: 4rem;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: url(${background});
    background-position: 50% -10%;
    background-size: 110%;
    z-index: -1;
  }
`

const StyledFlex = styled(Flex)`
  height: 100%;
`

const StyledImage = styled.img`
  width: 100%;
  height: auto;
`

export { StyledMenu, StyledFlex, StyledImage }
