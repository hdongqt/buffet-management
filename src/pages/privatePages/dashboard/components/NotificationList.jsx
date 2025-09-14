import React from 'react'
import { List, Empty, Button, Typography, Flex, Row, Col } from 'antd'
import {
  CheckCircleOutlined,
  DownOutlined,
  UpOutlined,
} from '@ant-design/icons'

import { CommonUI } from '@/components/common'
import NotificationItem from './NotificationItem'

import { NOTIFICATION_TYPE_OPTIONS } from '@/constants/options'

import { NotificationListStyle } from '../styled'

const { Text } = Typography
const { CustomSelect } = CommonUI

const NotificationList = ({
  notifications = [],
  displayedNotifications = [],
  onMarkAsRead,
  onMarkAllAsRead,
  isShowAll = false,
  onFilterChange,
  filters = {},
  onToggleShowAll,
}) => {
  const typeOptions = NOTIFICATION_TYPE_OPTIONS.map((option) => ({
    value: option.value,
    label: option.label,
  }))

  return (
    <NotificationListStyle.Container>
      <Row gutter={[16, 16]} align='middle'>
        <Col xs={24} sm={6}>
          <NotificationListStyle.Filter>
            <Text className='filter__label' strong>
              Lọc theo:
            </Text>
            <CustomSelect
              placeholder='Loại thông báo'
              value={filters.type || ''}
              onChange={(value) => onFilterChange('type', value)}
              allowClear
              options={typeOptions}
            />
          </NotificationListStyle.Filter>
        </Col>

        {notifications.length > 0 &&
          notifications.findIndex(
            (notificationItem) => !notificationItem.isRead
          ) > -1 && (
            <Col xs={24} sm={18}>
              <Flex justify='end' align='center'>
                <Button
                  type='primary'
                  icon={<CheckCircleOutlined />}
                  onClick={onMarkAllAsRead}
                >
                  Đánh dấu tất cả đã đọc
                </Button>
              </Flex>
            </Col>
          )}
      </Row>

      {notifications.length === 0 ? (
        <Empty description='Không có thông báo nào' />
      ) : (
        <>
          <List
            dataSource={displayedNotifications}
            renderItem={(notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                onMarkAsRead={onMarkAsRead}
              />
            )}
          />

          {notifications.length > 25 && (
            <NotificationListStyle.ShowMore>
              <Button
                type='primary'
                ghost
                icon={isShowAll ? <UpOutlined /> : <DownOutlined />}
                onClick={onToggleShowAll}
              >
                {isShowAll
                  ? 'Thu gọn'
                  : `Xem thêm (${notifications.length - 25})`}
              </Button>
            </NotificationListStyle.ShowMore>
          )}
        </>
      )}
    </NotificationListStyle.Container>
  )
}

export default NotificationList
