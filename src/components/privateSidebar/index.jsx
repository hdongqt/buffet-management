import { useNavigate, useLocation } from 'react-router-dom'
import { Layout, Menu } from 'antd'
import { StrikethroughOutlined } from '@ant-design/icons'

import { useDispatch } from 'react-redux'
import { signOut } from '@/sagas/users/userSlice'

import { SideBarLogoStyle, SideBarStyle } from './styled'
import ROLES from '@/constants/roles'
import { ADMIN_MENU, STAFF_MENU } from '@/constants/privateMenu'
import { useSelector } from 'react-redux'

const PrivateSidebar = ({ collapsed, setCollapsed }) => {
  const { user } = useSelector((state) => state.user)
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()

  const sidebarList = user?.role === ROLES.ADMIN ? ADMIN_MENU : STAFF_MENU

  const handleMenuClick = async ({ key }) => {
    if (key === 'signout') {
      localStorage.clear()
      await dispatch(signOut())
      navigate('/login')
    } else {
      navigate(key)
    }
  }

  return (
    <SideBarStyle collapsed={collapsed} onCollapse={setCollapsed} width={250}>
      <SideBarLogoStyle>
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
