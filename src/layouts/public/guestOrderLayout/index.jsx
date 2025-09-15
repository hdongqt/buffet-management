import { Layout } from 'antd'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

import logo from '@/assets/images/main/logo.png'

import { GuestOrderLayoutWrapper } from './styled'
import { GUEST_ORDER_MENU } from '@/components/menu/guestOrderMenu'
import { useSocket } from '@/contexts/socket'
import { useEffect } from 'react'
import { SOCKET_EVENT } from '@/constants/status'
import { useSelector } from 'react-redux'

const { Header, Content, Footer } = Layout

const GuestOrderLayout = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { order } = useSelector((state) => state.guestOrder)

  const socket = useSocket()

  const handleMenuClick = (e) => {
    navigate(e.key)
  }

  useEffect(() => {
    if (!order?.id || !socket) return

    socket.emit(SOCKET_EVENT.JOIN_ORDER, order.id)

    const handleRedirect = () => {
      navigate('/')
    }

    socket.on(SOCKET_EVENT.ORDER_PAID, handleRedirect)
  }, [order, socket])

  return (
    <GuestOrderLayoutWrapper.Layout>
      <Header>
        <GuestOrderLayoutWrapper.HeaderContent>
          <GuestOrderLayoutWrapper.Logo src={logo} alt='Sakura Buffet' />
        </GuestOrderLayoutWrapper.HeaderContent>
      </Header>

      <Content>
        <Outlet />
      </Content>

      <Footer>
        <GuestOrderLayoutWrapper.BottomMenu
          selectedKeys={[location.pathname]}
          items={GUEST_ORDER_MENU}
          onClick={handleMenuClick}
        />
      </Footer>
    </GuestOrderLayoutWrapper.Layout>
  )
}

export default GuestOrderLayout
