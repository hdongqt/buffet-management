import styled from 'styled-components'
import { ABOUT_IMAGES } from '@/constants/images/aboutUserImage'
import { Button, Flex } from 'antd'
import { theme } from '@/constants/theme'

const { breakpoints, colors } = theme

const AboutWrapper = styled.section`
  position: relative;
  z-index: 1;
  padding: 140px 120px 80px;

  a {
    width: 100%;
  }

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: url(${ABOUT_IMAGES.bgAbout});
    background-position: 50% -10%;
    background-size: 110%;
    z-index: -1;
  }

  @media screen and (max-width: ${breakpoints.xxl}) {
    padding: 100px 60px 60px;
  }

  @media screen and (max-width: ${breakpoints.xl}) {
    padding: 100px 50px 60px;
  }

  @media screen and (max-width: ${breakpoints.lg}) {
    padding: 70px 40px 40px;
  }

  @media screen and (max-width: ${breakpoints.sm}) {
    padding: 50px 0px 10px;
  }
`

const About = {
  Content: styled(Flex)`
    padding: 0 36px;
    height: 100%;
  `,

  Title: styled.h3`
    font-size: 16px;
    font-weight: 400;
    margin-bottom: 12px;
  `,

  Subtitle: styled.h2`
    font-size: 36px;
    font-weight: 900;
    text-transform: uppercase;
    margin-bottom: 20px;
    color: #c00;
  `,

  Desc: styled.div`
    line-height: 1.6;
    color: #333;
    margin-bottom: 20px;

    p {
      font-size: 20px;
      margin-bottom: 14px;
    }
  `,

  Button: styled(Button)`
    font-size: 20px;
    font-weight: 600;
    text-transform: uppercase;
    padding: 20px;
    border-radius: 40px;
    border: none;
    background-color: #c00;
    color: #fff;
    transition: all 0.3s ease;

    &:hover,
    &:focus {
      background: ${colors.mainPrimaryColor} !important;
      transform: scale(1.05);
    }
  `,

  Image: styled.img`
    width: 100%;
    height: auto;
    object-fit: cover;
    border-radius: 8px;
    display: block;
    transition: all 0.3s ease-out;

    &:hover {
      transform: scale(1.1);
    }
  `,
}

export { AboutWrapper, About }

