import { Outlet, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { Typography, Layout, Divider, notification } from 'antd'

import { ADMIN_MENU, MANAGER_MENU } from '@/components/menu/privateMenu'
import PrivateHeader from '@/components/privateHeader/index'
import PrivateSidebar from '@/components/privateSidebar/index'

import ROLES from '@/constants/roles'
import { useSocket } from '@/contexts/socket'

import { Private } from './styled'
import { SOCKET_EVENT } from '@/constants/status'

function PrivateLayout() {
  const { user } = useSelector((state) => state.user)
  const pathname = useLocation().pathname
  const socket = useSocket()

  const [collapsed, setCollapsed] = useState(false)
  const [api, contextHolder] = notification.useNotification()

  const LIST_TITLE = user?.role === ROLES.ADMIN ? ADMIN_MENU : MANAGER_MENU
  const currentPath = LIST_TITLE.find((item) => item.key === pathname)

  const openNotification = ({ title, message }) => {
    api.info({
      message: title,
      description:
        message?.length > 100 ? message.slice(0, 100) + '...' : message,
      placement: 'bottomRight',
    })
  }

  useEffect(() => {
    if (!socket) return

    socket.on('connect', () => {
      socket.emit(SOCKET_EVENT.JOIN_MANAGER)
    })

    socket.on(SOCKET_EVENT.NEW_NOTIFICATION, (notification) => {
      openNotification(notification)
    })

    return () => {
      socket.off('connect')
    }
  }, [socket])

  return (
    <Private.Layout>
      <PrivateSidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <Layout>
        <PrivateHeader collapsed={collapsed} setCollapsed={setCollapsed} />
        <Layout.Content className='home-layout__content'>
          <Private.Content>
            <Typography.Title level={3}>{currentPath?.label}</Typography.Title>
            <Divider />
            <Outlet />
          </Private.Content>
        </Layout.Content>
      </Layout>
      {contextHolder}
    </Private.Layout>
  )
}
export default PrivateLayout
