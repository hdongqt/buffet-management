import { Layout, Badge } from 'antd'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { BellOutlined } from '@ant-design/icons'

import logo from '@/assets/images/main/logo.png'

import { GuestOrderLayoutWrapper } from './styled'
import { GUEST_ORDER_MENU } from '@/components/menu/guestOrderMenu'

const { Header, Content, Footer } = Layout

const GuestOrderLayout = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const handleMenuClick = (e) => {
    navigate(e.key)
  }

  return (
    <GuestOrderLayoutWrapper.Layout>
      <Header>
        <GuestOrderLayoutWrapper.HeaderContent>
          <GuestOrderLayoutWrapper.Logo src={logo} alt='Sakura Buffet' />
          <GuestOrderLayoutWrapper.HeaderRight>
            <Badge dot>
              <BellOutlined className='bell-icon' />
            </Badge>
          </GuestOrderLayoutWrapper.HeaderRight>
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
