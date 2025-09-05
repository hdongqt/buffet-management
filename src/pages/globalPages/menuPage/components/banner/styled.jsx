import { Carousel } from 'antd'
import styled from 'styled-components'
import { theme } from '@/constants/theme'

const { breakpoints } = theme

const Banner = {
  Section: styled.section`
    position: relative;
  `,

  Carousel: styled(Carousel)`
    width: 100%;
  `,

  Image: styled.img`
    width: 100%;
    height: 35vh;
    object-fit: cover;

    @media screen and (max-width: ${breakpoints.md}) {
      height: 50vh;
    }
  `,
}

export { Banner }
