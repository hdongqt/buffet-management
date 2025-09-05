import styled from 'styled-components'
import FooterIMG from '@/assets/images/main/customer-bg.jpg'
import { Flex } from 'antd'
import { theme } from '@/constants/theme'

const { breakpoints } = theme

const FooterContentStyled = styled(Flex)`
  background: linear-gradient(rgba(255, 204, 0, 0.912), rgba(255, 204, 0, 0.95)),
    url(${FooterIMG}) center/cover no-repeat;
  padding: 80px 60px;

  @media screen and (max-width: ${breakpoints.md}) {
    flex-direction: column;
    row-gap: 28px;
    padding: 80px 20px;
  }

  .footer-logo img {
    width: 160px;
  }

  .footer-contact {
    &__title {
      color: var(--ant-main-secondary-color);
      margin-bottom: 12px;
      font-weight: 600;
      font-size: 28px;
    }

    ul {
      list-style: none;
      line-height: 1.8;
      li {
        font-size: 16px;
      }
    }
  }
`

const FooterCopyrightStyled = styled.div`
  background: #b22222;
  color: #fff;
  text-align: center;
  padding: 12px 0;
  font-size: 14px;
`

export { FooterContentStyled, FooterCopyrightStyled }
