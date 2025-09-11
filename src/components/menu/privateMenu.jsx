import { ADMIN_ROUTES, MANAGER_ROUTES } from '@/constants/listRoutes'
import {
  IdcardOutlined,
  LogoutOutlined,
  OrderedListOutlined,
  ReadOutlined,
  TableOutlined,
  UnorderedListOutlined,
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
    key: MANAGER_ROUTES.RESERVATION,
    label: 'Quản lý đặt bàn',
    icon: <IdcardOutlined />,
  },
  {
    key: MANAGER_ROUTES.CATEGORIES,
    label: 'Quản lý danh mục',
    icon: <UnorderedListOutlined />,
  },
  {
    key: MANAGER_ROUTES.ORDERS,
    label: 'Quản lý Order',
    icon: <OrderedListOutlined />,
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
