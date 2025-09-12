import { Card, Typography } from 'antd'
import styled, { keyframes } from 'styled-components'

import { theme } from '@/constants/theme'

import bgWelcome from '@/assets/images/home/slider/banner-01.jpg'

const { breakpoints } = theme
const { Title, Text } = Typography

const fade = keyframes`
  0% { opacity: 0.3; }
  50% { opacity: 1; }
  100% { opacity: 0.3; }
`

const TableQR = {
  Background: styled.div`
    width: 100vw;
    height: 100vh;
    background-image: url(${bgWelcome});
    background-size: cover;
    background-position: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: white;
  `,

  Overlay: styled.div`
    background-color: rgba(23, 22, 22, 0.877);
    padding: 40px 60px;
    border-radius: 16px;
  `,

  LogoWrapper: styled.div`
    width: 100%;
    filter: drop-shadow(1px 0 11px rgba(0, 2, 0, 1.808));
  `,

  Logo: styled.img`
    width: 160px;
    margin-bottom: 20px;
  `,

  Title: styled(Title)`
    &.ant-typography {
      color: white;
      margin-bottom: 10px;
      margin-top: 0px;
    }
  `,

  Text: styled(Text)`
    &.ant-typography {
      color: white;
      display: block;
      font-size: 24px;
      margin-bottom: 16px;
    }
  `,

  TextError: styled(Text)`
    &.ant-typography {
      color: red;
      display: block;
      font-size: 24px;
      margin-bottom: 16px;
    }
  `,

  Card: styled(Card)`
    width: ${(props) => props.$width}px;
    .ant-card-body {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 40px 100px;

      @media screen and (max-width: ${breakpoints.md}) {
        padding: 20px 50px;
      }
    }
  `,

  Container: styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    inset: 0;
    background-color: rgba(255, 255, 255, 0.907);
  `,

  WaitingText: styled(Text)`
    margin-top: 20px;
    display: block;
    font-size: 20px;
    color: #fff;
    animation: ${fade} 1.5s infinite;
  `,

  ImageSelect: styled.img`
    width: 50px;
    height: 50px;
    object-fit: cover;
    border-radius: 4;
  `,
}

export { TableQR }
