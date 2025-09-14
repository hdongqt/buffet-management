import React from 'react'
import { Tag, Typography, Button, Space, Flex } from 'antd'
import { CheckCircleOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'

import DATE_FORMAT from '@/constants/dateTimeFormat'
import { NOTIFICATION_TYPE_OPTIONS } from '@/constants/options'

import { NotificationItemStyle } from '../styled'

const { Text, Title } = Typography

const NotificationItem = ({ notification, onMarkAsRead }) => {
  const { id, title, message, type, isRead, createdAt } = notification

  const getNotificationType = NOTIFICATION_TYPE_OPTIONS.find(
    (notification) => notification.value === type
  ) || {
    color: '#d9d9d9',
    label: 'Thông báo',
  }

  const readAll = () => {
    onMarkAsRead(id)
  }

  return (
    <NotificationItemStyle.Wrapper>
      <NotificationItemStyle.Card
        $type={type}
        className={!isRead ? 'unread' : ''}
      >
        {!isRead && <NotificationItemStyle.UnreadBadge />}

        <NotificationItemStyle.Header>
          <Space>
            <Tag color={getNotificationType.color}>
              {getNotificationType.label}
            </Tag>
          </Space>
          <Text type='secondary'>
            {dayjs(createdAt).format(DATE_FORMAT.DATE_TIME)}
          </Text>
        </NotificationItemStyle.Header>

        <NotificationItemStyle.Content>
          <Title level={5}>{title}</Title>
          <Text>{message}</Text>
        </NotificationItemStyle.Content>

        <Flex justify='end' align='center'>
          {!isRead && (
            <Button
              type='link'
              size='small'
              icon={<CheckCircleOutlined />}
              onClick={readAll}
            >
              Đánh dấu đã đọc
            </Button>
          )}
        </Flex>
      </NotificationItemStyle.Card>
    </NotificationItemStyle.Wrapper>
  )
}

export default NotificationItem
