import styled from 'styled-components'
import { Card, Typography } from 'antd'

const { Title, Paragraph, Text } = Typography

const IntroQRStyles = {
  Container: styled.div`
    min-height: 100vh;
    background: linear-gradient(rgba(93, 68, 68, 0.5), rgba(79, 75, 75, 0.5)),
      url(${(props) => props.bgImage});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    padding: 20px;
  `,
  ContentWrapper: styled.div`
    max-width: 1200px;
    margin: 0 auto;
  `,
  HeroSection: styled.div`
    text-align: center;
    color: white;
    padding: 60px 0;
    margin-bottom: 60px;
  `,
  QRCodeDemo: styled.div`
    width: 120px;
    height: 120px;
    background: white;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 20px;
    border: 2px solid #f0f0f0;

    .qr-icon {
      font-size: 48px;
      color: #667eea;
    }
  `,
  FeatureCard: styled(Card)`
    height: 100%;
    border-radius: 16px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    border: none;
    transition: transform 0.3s ease;

    &:hover {
      transform: translateY(-8px);
    }
  `,

  FeatureIconWrapper: styled.div`
    text-align: center;
    padding: 20px 0;
  `,

  StepCard: styled(Card)`
    height: 100%;
    border-radius: 16px;
    background: linear-gradient(45deg, #c12f2f 0%, #f5576c 100%);
    border: none;
    color: white;

    .ant-card-body {
      text-align: center;
    }
  `,
  HeroTitle: styled(Title)`
    &.ant-typography {
      color: #fff;
      font-size: 35px;
      margin: 16px 0px 24px 0px;
      text-align: center;
    }
  `,
  HeroParagraph: styled(Paragraph)`
    color: white;
    font-size: 16px;
    max-width: 600px;
    margin: 0 auto 40px;
    line-height: 1.6;
  `,
  FeatureTitle: styled(Title)`
    &.ant-typography {
      margin: 20px 0 16px;
      color: #333;
    }
  `,
  FeatureIcon: styled.div`
    font-size: 32px;
    color: ${(props) => props.color || '#000'};
    display: inline-flex;
  `,
  FeatureDescription: styled(Paragraph)`
    color: #666;
    line-height: 1.6;
  `,
  StepNumber: styled(Text)`
    font-size: 2rem;
    font-weight: bold;
    color: rgba(255, 255, 255, 0.8);
  `,
  StepTitle: styled(Title)`
    &.ant-typography {
      color: #fff;
      margin: 16px 0;
    }
  `,
  StepDescription: styled(Paragraph)`
    color: rgba(255, 255, 255, 0.9);
    margin: 0;
  `,
}

export { IntroQRStyles }
