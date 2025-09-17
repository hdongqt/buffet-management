import { Card } from 'antd'
import { styled } from 'styled-components'

const getTypeColor = (type) => {
  switch (type) {
    case 'new_order':
      return '#1890ff'
    case 'order_new_dish':
      return '#faad14'
    case 'payment_request':
      return '#52c41a'
    case 'staff_call':
      return '#ff4d4f'
    default:
      return '#d9d9d9'
  }
}

const DashboardStyle = {
  Container: styled.div`
    padding: 24px;
    background: #f5f5f5;
    min-height: 100vh;
  `,
  StatsCard: styled(Card)`
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s ease;
    height: 100%;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
    }

    .ant-statistic-title {
      color: #666;
      font-size: 14px;
    }

    .ant-statistic-content {
      color: ${({ $color }) => $color || '#1890ff'};
    }
  `,
  NotificationSection: styled(Card)`
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    margin-top: 24px;

    .ant-typography {
      margin: 0;
    }

    .ant-card-head {
      border-bottom: 1px solid #f0f0f0;
    }
  `,
  Header: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
  `,
}

const NotificationItemStyle = {
  Wrapper: styled.div`
    margin-top: 14px;
  `,

  Card: styled(Card)`
    margin-bottom: 12px;
    border-radius: 12px;
    border-left: 4px solid ${({ $type }) => getTypeColor($type)};
    transition: all 0.2s ease;
    position: relative;

    &:hover {
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      transform: translateY(-1px);
    }

    &.unread {
      background: linear-gradient(135deg, #f6f8ff 0%, #ffffff 100%);
      border-left-width: 6px;
    }

    .ant-card-body {
      padding: 16px;
    }
  `,

  Header: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 8px;
  `,

  Content: styled.div`
    margin-bottom: 12px;
  `,

  UnreadBadge: styled.div`
    position: absolute;
    top: 10px;
    right: 12px;
    width: 8px;
    height: 8px;
    background: #ff4d4f;
    border-radius: 50%;
  `,
}

const NotificationListStyle = {
  Container: styled.div`
    .notification-list-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
      padding: 16px;
      background: #fafafa;
      border-radius: 8px;
    }

    .ant-list {
      .ant-list-item {
        padding: 0;
        border: none;
      }
    }
  `,

  Filter: styled.div`
    display: flex;
    align-items: center;
    gap: 12px;

    .filter__label {
      white-space: nowrap;
    }
  `,

  ShowMore: styled.div`
    text-align: center;
    margin-top: 16px;
  `,
}

export { DashboardStyle, NotificationItemStyle, NotificationListStyle }
