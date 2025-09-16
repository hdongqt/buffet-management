import { Outlet, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { Typography, Layout, Divider } from 'antd'

import { ADMIN_MENU, MANAGER_MENU } from '@/components/menu/privateMenu'
import PrivateHeader from '@/components/privateHeader'
import PrivateSidebar from '@/components/privateSidebar'

import ROLES from '@/constants/roles'
import { useSocket } from '@/contexts/socket'
import { SOCKET_EVENT } from '@/constants/status'

import useNotificationQueue from '@/hooks/useNotificationQueue'

import { Private } from './styled'

function PrivateLayout() {
  const { user } = useSelector((state) => state.user)
  const pathname = useLocation().pathname
  const socket = useSocket()

  const [collapsed, setCollapsed] = useState(false)
  const { pushNotification, contextHolder } = useNotificationQueue()

  const LIST_TITLE = user?.role === ROLES.ADMIN ? ADMIN_MENU : MANAGER_MENU
  const currentPath = LIST_TITLE.find((item) => item.key === pathname)

  useEffect(() => {
    if (!socket) return

    const handleConnect = () => {
      socket.emit(SOCKET_EVENT.JOIN_MANAGER)
    }

    const handleShowNotification = ({ title, message }) => {
      pushNotification({
        title,
        message:
          message?.length > 100 ? message.slice(0, 100) + '...' : message,
      })
    }

    socket.on('connect', handleConnect)
    socket.on(SOCKET_EVENT.NEW_NOTIFICATION, handleShowNotification)

    return () => {
      socket.off('connect', handleConnect)
      socket.off(SOCKET_EVENT.NEW_NOTIFICATION, handleShowNotification)
    }
  }, [socket, pushNotification])

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
        {contextHolder}
      </Layout>
    </Private.Layout>
  )
}

export default PrivateLayout
