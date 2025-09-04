import { ADMIN_ROUTES, MANAGER_ROUTES } from '@/constants/listRoutes'
import { IdcardOutlined, LogoutOutlined } from '@ant-design/icons'

const MANAGER_MENU = [
  {
    key: MANAGER_ROUTES.ROOT,
    label: 'Table Management',
    icon: <IdcardOutlined />,
  },
  {
    type: 'divider',
  },
  {
    key: 'signout',
    label: 'Sign out',
    icon: <LogoutOutlined />,
  },
]

const ADMIN_MENU = [
  {
    key: ADMIN_ROUTES.ROOT,
    label: 'Dashboard',
    icon: <IdcardOutlined />,
  },
  {
    type: 'divider',
  },
  {
    key: 'signout',
    label: 'Sign out',
    icon: <LogoutOutlined />,
  },
]

export { MANAGER_MENU, ADMIN_MENU }
