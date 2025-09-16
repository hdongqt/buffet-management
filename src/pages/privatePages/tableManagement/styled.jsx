import styled from 'styled-components'
import { Space, Avatar, Empty, Card, Typography } from 'antd'
import {
  ClockCircleOutlined,
  FileTextOutlined,
  PhoneOutlined,
  UserOutlined,
} from '@ant-design/icons'

const { Text } = Typography

const TableStyle = {
  ImageQR: styled.img`
    width: 200px;
    height: 200px;
  `,
}

const ReservationTodayStyle = {
  Container: styled.div`
    max-height: 500px;
    overflow-y: auto;
  `,

  ReservationCard: styled(Card)`
    border-radius: 8px;
    border: 1px solid #e8e8e8;
    margin-bottom: 12px;

    &:last-child {
      margin-bottom: 0;
    }
  `,

  CardContent: styled(Space)`
    width: 100%;
  `,

  UserInfo: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
  `,

  UserAvatar: styled(Avatar)`
    background-color: #1890ff;
  `,

  UserName: styled(Text)`
    font-size: 14px;
    font-weight: 600;
  `,

  InfoRow: styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
    margin-left: 32px;
  `,

  InfoItem: styled.div`
    display: flex;
    align-items: center;
    gap: 4px;
  `,

  TimeText: styled(Text)`
    color: #1890ff;
    font-size: 14px;
    font-weight: 600;
  `,

  TimeIcon: styled(ClockCircleOutlined)`
    color: #1890ff;
    font-size: 18px;
  `,

  PeopleIcon: styled(UserOutlined)`
    color: #52c41a;
    font-size: 18px;
  `,

  PhoneIcon: styled(PhoneOutlined)`
    color: #fa8c16;
    font-size: 18px;
  `,

  NoteRow: styled.div`
    display: flex;
    align-items: center;
    gap: 4px;
    margin-left: 32px;
  `,

  NoteIcon: styled(FileTextOutlined)`
    color: #faad14;
    font-size: 14px;
  `,

  NoteText: styled(Text)`
    font-size: 14px;
    color: #666;

    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  `,

  EmptyState: styled(Empty)`
    padding: 20px 0;
  `,
}

export { TableStyle, ReservationTodayStyle }
