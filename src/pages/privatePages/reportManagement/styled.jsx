import { Row, Typography } from 'antd'
import { Segmented } from 'antd'
import { Card } from 'antd'
import styled from 'styled-components'

const ReportStyled = {
  Wrapper: styled.div`
    min-height: 100vh;
  `,

  Card: styled(Card)`
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    margin-bottom: 16px;
    height: 100%;
  `,

  StatisticCard: styled(Card)`
    border-radius: 12px;
    text-align: center;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    height: 100%;
    color: #fff;

    &.revenue {
      background: linear-gradient(135deg, #667eea, #764ba2);
    }

    &.orders {
      background: linear-gradient(135deg, #f7971e, #ffd200);
    }

    &.unpaid {
      background: linear-gradient(135deg, #ff416c, #ff4b2b);
    }

    &.paid {
      background: linear-gradient(135deg, #105a54, #34c46b);
    }

    .ant-statistic-title,
    .ant-statistic-content {
      color: #fff !important;
    }
  `,

  SectionTitle: styled(Typography.Title)`
    font-size: 18px !important;
    margin-bottom: 12px;
    color: #333;
  `,

  PaymentText: styled(Typography.Text)`
    font-weight: 600;
    font-size: 14px;
    color: #fff !important;
  `,

  ChartWrapper: styled.div`
    height: 300px;
  `,

  Segmented: styled(Segmented)`
    margin-bottom: 12px;
  `,

  RowSection: styled(Row)`
    margin-bottom: 16px;
  `,
}

export default ReportStyled
