import styled from 'styled-components'

import { theme } from '@/constants/theme'
const { breakpoints } = theme

const Container = styled.div`
  position: relative;
`
const Banner = styled.section`
  width: 100%;
  height: 25vh;
  overflow: hidden;

  @media screen and (max-width: ${breakpoints.lg}) {
    height: 15vh;
  }
`

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center bottom;
`

export { Container, Banner, Image }
