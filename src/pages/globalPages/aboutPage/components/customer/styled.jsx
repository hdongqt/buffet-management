import styled from 'styled-components'
import { ABOUT_IMAGES } from '@/constants/images/aboutUserImage'
import { theme } from '@/constants/theme'

const { breakpoints } = theme

const CustomerWrapper = styled.section`
  position: relative;
  z-index: 1;
  padding: 80px;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: url(${ABOUT_IMAGES.bgAbout});
    background-position: 50% -10%;
    background-size: 110%;
    z-index: -1;
  }

  @media screen and (max-width: ${breakpoints.lg}) {
    padding: 60px 20px;
  }

  @media screen and (max-width: ${breakpoints.md}) {
    padding: 40px 20px;
  }

  @media screen and (max-width: ${breakpoints.sm}) {
    padding: 20px 10px;
  }
`

const Customer = {
  Label: styled.img`
    width: 60vw;
    margin-bottom: 24px;

    @media screen and (max-width: ${breakpoints.md}) {
      width: 90vw;
    }
  `,

  Desc: styled.p`
    font-size: 20px;
    padding: 0 60px;
    text-align: center;
    margin-bottom: 94px;

    @media screen and (max-width: ${breakpoints.lg}) {
      font-size: 20px;
      padding: 0 40px;
      margin-bottom: 64px;
    }

    @media screen and (max-width: ${breakpoints.md}) {
      font-size: 16px;
      padding: 0 20px;
      margin-bottom: 48px;
    }

    @media screen and (max-width: ${breakpoints.sm}) {
      font-size: 14px;
      padding: 0 10px;
      margin-bottom: 32px;
    }
  `,

  Carousel: styled.div`
    width: 40vw;
    min-height: 200px;

    @media screen and (max-width: ${breakpoints.md}) {
      width: 100%;
      max-width: 500px;
      margin: 0 auto;
    }

    @media screen and (max-width: ${breakpoints.sm}) {
      width: 90vw;
      max-width: 500px;
      margin: 0 auto;
    }
  `,

  Image: styled.img`
    width: 100%;
    display: block;
  `,
}

export { CustomerWrapper, Customer }
