import { ADMIN_ROUTES, MANAGER_ROUTES } from '@/constants/listRoutes'
import {
  IdcardOutlined,
  LogoutOutlined,
  ReadOutlined,
  TableOutlined,
} from '@ant-design/icons'

const MANAGER_MENU = [
  {
    key: MANAGER_ROUTES.ROOT,
    label: 'Quản lý bàn',
    icon: <TableOutlined />,
  },
  {
    key: MANAGER_ROUTES.MENUS,
    label: 'Quản lý món',
    icon: <ReadOutlined />,
  },
  {
    type: 'divider',
  },
  {
    key: 'signout',
    label: 'Đăng xuất',
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
