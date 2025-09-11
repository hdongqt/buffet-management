import styled from 'styled-components'
import { Layout, Menu, Button, Badge, Card } from 'antd'
import {
  ShoppingCartOutlined,
  BellOutlined,
  MenuOutlined,
} from '@ant-design/icons'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { GUEST_ORDER_ROUTES } from '@/constants/listRoutes'
import logo from '@/assets/images/main/logo.png'
const { Header, Content, Footer } = Layout

const LogoStyled = styled.img`
  width: 160px;
`

const GuestOrderLayout = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [cartCount, setCartCount] = useState(3) // Example cart count

  const menuItems = [
    {
      key: GUEST_ORDER_ROUTES.ROOT,
      icon: <MenuOutlined />,
      label: 'Thực đơn',
    },
    {
      key: GUEST_ORDER_ROUTES.ORDER,
      icon: (
        <Badge count={cartCount} size='small'>
          <ShoppingCartOutlined />
        </Badge>
      ),
      label: 'Đơn hàng',
    },
    {
      key: GUEST_ORDER_ROUTES.CALL_STAFF,
      icon: <BellOutlined />,
      label: 'Gọi nhân viên',
    },
  ]

  const handleMenuClick = (e) => {
    navigate(e.key)
  }

  return (
    <StyleGuestOrderLayout>
      <Header>
        <HeaderContent>
          <LogoStyled src={logo} alt='Sakura Buffet' />
          <HeaderRight>
            <Badge dot>
              <BellOutlined style={{ fontSize: '18px', color: 'white' }} />
            </Badge>
          </HeaderRight>
        </HeaderContent>
      </Header>

      <Content>
        <Outlet />
      </Content>

      <Footer>
        <BottomMenu
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={handleMenuClick}
        />
      </Footer>
    </StyleGuestOrderLayout>
  )
}

export default GuestOrderLayout

const StyleGuestOrderLayout = styled(Layout)`
  min-height: 100vh;

  .ant-layout-header {
    background: #3a3a3b;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 1000;
  }

  .ant-layout-content {
    margin-top: 64px;
    margin-bottom: 64px;
    padding: 16px;
    background: #f5f5f5;
  }

  .ant-layout-footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    padding: 0;
    background: white;
    border-top: 1px solid #f0f0f0;
    z-index: 1000;
  }
`

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  padding: 0 16px;
`

const Logo = styled.div`
  display: flex;
  align-items: center;
`

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
`

const BottomMenu = styled(Menu)`
  display: flex;
  justify-content: space-around;
  border: none;

  .ant-menu-item {
    text-align: center;
    padding: 8px 8px;
    flex: 1;
    border-radius: 0px;
    margin: 0 !important;
    display: flex !important;
    flex-direction: column;
    align-items: center;
    gap: 2px;

    .ant-menu-title-content {
      font-size: 14px;
      line-height: 1;
    }

    .anticon {
      font-size: 20px;
      margin: 0 !important;
    }
  }

  .ant-menu-item-selected {
    color: #1890ff !important;
    background-color: #e6f7ff !important;
  }
`
