import styled from 'styled-components'
import { HOME_BACKGROUND } from '@/constants/images/homeUserImage'
import { theme } from '@/constants/theme'

const { breakpoints } = theme

const HomeWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

// ============= MENU =============
const Menu = {
  Section: styled.section`
    position: relative;
    text-align: center;
  `,

  Title: styled.img`
    position: absolute;
    top: -50px;
    left: 50%;
    transform: translateX(-50%);
    max-width: 300px;

    @media (max-width: ${breakpoints.md}) {
      max-width: 200px;
      top: -30px;
    }

    @media (max-width: ${breakpoints.xs}) {
      max-width: 150px;
      top: -20px;
    }
  `,

  Banner: styled.img`
    object-fit: cover;
    width: 100%;

    @media (max-width: ${breakpoints.md}) {
      max-height: 400px;
      width: 100%;
    }
  `,

  Button: styled.div`
    position: absolute;
    bottom: 5%;
    left: 50%;
    transform: translateX(-50%);
  `,
}

// ============= INTRODUCE =============
const Introduce = {
  Section: styled.section`
    background: url(${HOME_BACKGROUND.backgroundHome02}) no-repeat center/cover;
    padding: 40px 20px;

    @media (max-width: ${breakpoints.md}) {
      padding: 0 20px;
    }
  `,

  Content: styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    max-width: 800px;
    margin: 0 auto;
    align-items: center;
    padding: 50px 0;
  `,

  Discount: styled.h3`
    text-align: center;
    font-weight: 700;
    background-color: var(--ant-main-primary-color);
    width: 100%;
    color: white;
    border-radius: 990px;
    padding: 10px;

    @media (max-width: ${breakpoints.md}) {
      font-size: 18px;
      padding: 5px 10px;
    }

    @media (max-width: ${breakpoints.xs}) {
      font-size: 16px;
    }
  `,

  Banner: styled.img`
    max-width: 100%;
    border-radius: 10px;
  `,
}

// ============= CUSTOMER =============
const Customer = {
  Section: styled.section`
    text-align: center;
    background: url(${HOME_BACKGROUND.backgroundHome}) no-repeat center/cover;
    padding: 50px 0;
  `,

  Logo: styled.img`
    max-width: 100%;

    @media (max-width: ${breakpoints.md}) {
      max-width: 300px;
    }
    @media (max-width: ${breakpoints.xs}) {
      max-width: 200px;
    }
  `,

  Text: styled.p`
    font-size: 18px;
    padding: 20px;
  `,

  SliderWrapper: styled.div`
    display: flex;
    gap: 40px;
    box-sizing: border-box;
    padding: 40px 20px;
    max-width: 1280px;
    margin: 0 auto;

    @media (max-width: ${breakpoints.md}) {
      flex-direction: column;
    }
  `,

  SliderLeft: styled.div`
    width: 50%;

    @media (max-width: ${breakpoints.md}) {
      width: 100%;
    }
  `,

  SliderRight: styled.div`
    width: 50%;

    @media (max-width: ${breakpoints.md}) {
      width: 100%;
    }
  `,

  Image: styled.img`
    width: 100%;
    object-fit: cover;
  `,
}

// ============= BLOG =============
const Blog = {
  Section: styled.section`
    background: url(${HOME_BACKGROUND.backgroundHome}) no-repeat center/cover;
    padding: 40px 20px;
  `,

  Logo: styled.div`
    display: flex;
    justify-content: center;

    img {
      max-width: 300px;

      @media (max-width: ${breakpoints.md}) {
        max-width: 200px;
      }
    }
  `,

  Content: styled.div`
    text-align: center;
    padding: 20px 0;

    h4 {
      font-size: 20px;
      margin-bottom: 10px;
    }
  `,

  List: styled.ul`
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
    color: var(--ant-main-primary-color);
  `,

  Item: styled.li`
    a {
      color: var(--ant-main-primary-color);
      font-size: 16px;
      font-weight: 700;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  `,
}

export { HomeWrapper, Menu, Introduce, Customer, Blog }
