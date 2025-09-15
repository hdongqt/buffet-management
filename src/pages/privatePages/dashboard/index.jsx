import React, { useEffect } from 'react'
import { Row, Col, Statistic, Typography, Button, Spin, Flex } from 'antd'
import {
  BellOutlined,
  CreditCardOutlined,
  PhoneOutlined,
  ReloadOutlined,
  UserOutlined,
} from '@ant-design/icons'

import NotificationList from './components/NotificationList'

import useNotifications from '@/hooks/useNotifications'

import { DashboardStyle } from './styled'
import { useSocket } from '@/contexts/socket'
import { SOCKET_EVENT } from '@/constants/status'

const { Title } = Typography

export default function Dashboard() {
  const socket = useSocket()

  const {
    notifications,
    isShowAll,
    loading,
    handleFilterChange,
    fetchNotifications,
    handleMarkAsRead,
    handleMarkAllAsRead,
    refreshNotifications,
    filters,
    handleToggleShowAll,
    stats,
  } = useNotifications()

  useEffect(() => {
    fetchNotifications()
  }, [])

  useEffect(() => {
    if (!socket) return

    socket.on(SOCKET_EVENT.NEW_NOTIFICATION, fetchNotifications)

    return () => {
      socket.off(SOCKET_EVENT.NEW_NOTIFICATION, fetchNotifications)
    }
  }, [])

  return (
    <DashboardStyle.Container>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={6}>
          <DashboardStyle.StatsCard $color='#1890ff'>
            <Statistic
              title='Thông báo'
              value={stats.unread}
              prefix={<BellOutlined />}
            />
          </DashboardStyle.StatsCard>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <DashboardStyle.StatsCard $color='#ff944d'>
            <Statistic
              title='Khách hàng mới'
              value={stats.newOrder}
              prefix={<UserOutlined />}
            />
          </DashboardStyle.StatsCard>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <DashboardStyle.StatsCard $color='#52c41a'>
            <Statistic
              title='Gọi thanh toán'
              value={stats.paymentRequest}
              prefix={<CreditCardOutlined />}
            />
          </DashboardStyle.StatsCard>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <DashboardStyle.StatsCard $color='#ff4d4f'>
            <Statistic
              title='Gọi nhân viên'
              value={stats.staffCall}
              prefix={<PhoneOutlined />}
            />
          </DashboardStyle.StatsCard>
        </Col>
      </Row>

      <DashboardStyle.NotificationSection
        title={
          <Flex justify='space-between' align='center'>
            <Title level={4}>Thông báo hệ thống</Title>
            <Button
              type='primary'
              icon={<ReloadOutlined />}
              onClick={refreshNotifications}
              loading={loading}
            >
              Làm mới
            </Button>
          </Flex>
        }
      >
        <Spin spinning={loading}>
          <NotificationList
            notifications={notifications}
            displayedNotifications={
              isShowAll ? notifications : notifications.slice(0, 25)
            }
            onMarkAsRead={handleMarkAsRead}
            onMarkAllAsRead={handleMarkAllAsRead}
            onFilterChange={handleFilterChange}
            filters={filters}
            unreadCount={stats.unread}
            isShowAll={isShowAll}
            onToggleShowAll={handleToggleShowAll}
            totalCount={notifications.length}
          />
        </Spin>
      </DashboardStyle.NotificationSection>
    </DashboardStyle.Container>
  )
}
