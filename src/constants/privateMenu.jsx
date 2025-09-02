import { ADMIN_ROUTES, STAFF_ROUTES } from '@/routes/listRoutes'
import { IdcardOutlined, LogoutOutlined } from '@ant-design/icons'

const STAFF_MENU = [
  {
    key: STAFF_ROUTES.ROOT,
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

export { STAFF_MENU, ADMIN_MENU }
