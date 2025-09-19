import { useNavigate, useLocation } from 'react-router-dom'
import { Menu, Grid } from 'antd'
import { StrikethroughOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import { signOut } from '@/sagas/users/userSlice'

import { SideBarLogoStyle, SideBarStyle } from './styled'
import ROLES from '@/constants/roles'
import { ADMIN_MENU, MANAGER_MENU } from '@/components/menu/privateMenu'
import { useSelector } from 'react-redux'

const { useBreakpoint } = Grid

const PrivateSidebar = ({ collapsed, setCollapsed }) => {
  const { user } = useSelector((state) => state.user)
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()

  const screens = useBreakpoint()

  const sidebarList = user?.role === ROLES.ADMIN ? ADMIN_MENU : MANAGER_MENU

  const handleMenuClick = async ({ key }) => {
    if (key === 'signout') {
      localStorage.clear()
      await dispatch(signOut())
      navigate('/login')
    } else {
      navigate(key)
    }

    if (!screens.md) {
      setCollapsed(!collapsed)
    }
  }

  return (
    <SideBarStyle
      collapsed={collapsed}
      onCollapse={setCollapsed}
      width={screens.md || screens.sm || screens.xs ? (collapsed ? 0 : 250) : 0}
      collapsedWidth={screens.md ? 80 : 0}
      $isFixed={!screens.md}
    >
      <SideBarLogoStyle $isFixed={!screens.md}>
        <StrikethroughOutlined
          className={`sidebar__logo-icon ${collapsed ? 'collapsed' : ''}`}
        />
        {!collapsed && 'Sakura Buffet'}
      </SideBarLogoStyle>
      <Menu
        theme='light'
        mode='inline'
        selectedKeys={[location.pathname]}
        items={sidebarList}
        onClick={handleMenuClick}
      />
    </SideBarStyle>
  )
}

export default PrivateSidebar
