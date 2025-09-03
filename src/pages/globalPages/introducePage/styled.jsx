import styled from 'styled-components'

import bgAbout from '@/assets/images/introduce/Background-about.jpg'
import { Button } from 'antd'
import { theme } from '@/constants/theme'
const { breakpoints, colors } = theme

export const fadeDropJump = {
  hidden: { opacity: 0, y: -100, scale: 0 },
  visible: {
    opacity: 1,
    y: [-150, 25, 0],
    scale: [0.5, 0.9, 1],
    transition: {
      duration: 1,
      ease: 'easeOut',
    },
  },
}

export const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: 'easeInOut' },
  },
}

export const fadeRightLeft = {
  hidden: { opacity: 0, x: -200 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 1.5, ease: 'easeInOut' },
  },
}

export const fadeTopRight = {
  hidden: { opacity: 0, x: -500, y: 500 },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 1.5, ease: 'easeInOut' },
  },
}

export const fadeLeftRight = {
  hidden: { opacity: 0, x: 200 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 1.5, ease: 'easeInOut' },
  },
}

// Layout tổng
export const Container = styled.div`
  position: relative;
`
// Section Banner
export const BannerWrapper = styled.section`
  width: 100%;
  height: 25vh;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center bottom;
  }

  @media screen and (max-width: ${breakpoints.lg}) {
    height: 15vh;
  }
`

// Section About
export const AboutWrapper = styled.section`
  position: relative;
  z-index: 1;
  padding: 14rem 12rem 8rem;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: url(${bgAbout});
    background-position: 50% -10%;
    background-size: 110%;
    z-index: -1;
  }

  .about__content {
    padding: 0 3.6rem;
  }

  .about__title {
    font-size: 1.6rem;
    font-weight: 400;
    margin-bottom: 1.2rem;
  }

  .about__subtitle {
    font-size: 3.6rem;
    font-weight: 900;
    text-transform: uppercase;
    margin-bottom: 2rem;
    color: #c00;
  }

  .about__desc {
    p {
      font-size: 2rem;
      margin-bottom: 1.4rem;
    }
    line-height: 1.6;
    color: #333;
    margin-bottom: 2rem;
  }

  .about__button {
    font-size: 2rem;
    color: #fff;
    background-color: #c00;
    font-weight: 600;
    text-transform: uppercase;
    padding: 2rem;
    border-radius: 4rem;
  }

  .about__image img {
    width: 100%;
    height: auto;
    object-fit: cover;
    border-radius: 8px;
    display: block;
    transition: all 0.3s ease-out;

    &:hover {
      transform: scale(1.1);
    }
  }

  @media screen and (max-width: ${breakpoints.xl}) {
    padding: 10rem 8rem 6rem;
  }

  @media screen and (max-width: ${breakpoints.lg}) {
    padding: 7rem 6rem 4rem;
  }

  @media screen and (max-width: ${breakpoints.md}) {
    padding: 6rem 4rem 2rem;
  }
`

export const StyleButton = styled(Button)`
  transition: all 0.3s ease;
  border: none;
  color:  ${colors.white} !important;

  &:hover,
  &:focus {
    background: ${colors.mainPrimaryColor} !important;
    transform: scale(1.5);
  }
`

// Section Customer
export const CustomerWrapper = styled.section`
  position: relative;
  z-index: 1;
  padding: 8rem;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: url(${bgAbout});
    background-position: 50% -10%;
    background-size: 110%;
    z-index: -1;
  }

  .customer__label {
    width: 60vw;
    margin-bottom: 2.4rem;
  }

  .customer__desc {
    font-size: 2rem;
    padding: 0 6rem;
    text-align: center;
    margin-bottom: 9.4rem;
  }

  .customer__carousel {
    width: 40vw;
    min-height: 200px;

    img {
      width: 100%;
      display: block;
    }
  }

  @media screen and (max-width: ${breakpoints.lg}) {
    padding: 6rem 2rem;

    .customer__desc {
      font-size: 2rem;
      padding: 0 4rem;
      text-align: center;
      margin-bottom: 6.4rem;
    }
  }
  @media screen and (max-width: ${breakpoints.md}) {
    padding: 4rem 2rem;

    .customer__desc {
      font-size: 1.6rem;
      padding: 0 2rem;
      text-align: center;
      margin-bottom: 4.8rem;
    }

    .customer__carousel {
      width: 100%;
      max-width: 500px;
      margin: 0 auto;

      img {
        width: 100%;
        display: block;
      }
    }
  }

  @media screen and (max-width: ${breakpoints.md}) {
    padding: 2rem 1rem;

    .customer__desc {
      font-size: 1.4rem;
      padding: 0 1rem;
      text-align: center;
      margin-bottom: 3.2rem;
    }

    .customer__carousel {
      width: 90vw;
      max-width: 500px;
      margin: 0 auto;

      img {
        width: 100%;
        display: block;
      }
    }
  }
`
