import { Carousel } from 'antd'
import styled from 'styled-components'
import { theme } from '@/constants/theme'

const { breakpoints } = theme

const StyledBanner = styled.section`
  position: relative;
`
const StyledCarousel = styled(Carousel)`
  width: 100%;
  .slick-slide {
    text-align: center;
  }
`
const StyledImage = styled.img`
  width: 100%;
  height: 35vh;
  object-fit: cover;

  @media screen and (max-width: ${breakpoints.md}) {
    height: 50vh;
  }
`

export { StyledBanner, StyledCarousel, StyledImage }
