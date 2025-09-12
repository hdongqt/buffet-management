import { theme } from '@/constants/theme'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const { breakpoints } = theme

const Slider = {
  Wrapper: styled.div`
    position: relative;
    z-index: 1;
  `,

  CenterContent: styled.div`
    position: absolute;
    top: 100px;
    left: 100px;

    @media (max-width: ${breakpoints.md}) {
      top: 60px;
      left: 50%;
      transform: translateX(-50%);
      width: 90%;
    }
  `,

  Content: styled.div`
    max-width: 500px;
    background-color: rgba(255, 255, 255, 0.8);
    padding: 40px;
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: 20px;
    color: var(--ant-text-primary-color);

    @media (max-width: ${breakpoints.md}) {
      padding: 20px;
    }

    @media (max-width: ${breakpoints.xs}) {
      a {
        width: 100%;
      }
    }
  `,

  Logo: styled.span`
    font-weight: bold;
    font-size: 16px;
  `,

  Title: styled.h1`
    color: var(--ant-main-primary-color);
    text-align: left;
    font-size: 32px;

    @media (max-width: ${breakpoints.xs}) {
      font-size: 24px;
    }
  `,

  Description: styled.p`
    text-align: left;
    font-size: 18px;

    @media (max-width: ${breakpoints.xs}) {
      font-size: 14px;
    }
  `,

  Buttons: styled.div`
    display: flex;
    justify-content: space-around;
    gap: 20px;
    align-items: center;

    button {
      flex-grow: 1;
    }

    @media (max-width: ${breakpoints.xs}) {
      flex-direction: column;

      button {
        width: 100%;
      }
    }
  `,

  Link: styled(Link)`
    flex: 1;
  `,
}

export { Slider }
