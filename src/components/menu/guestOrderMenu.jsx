import { GUEST_ORDER_ROUTES } from '@/constants/listRoutes'
import {
  BellOutlined,
  MenuOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons'

const GUEST_ORDER_MENU = [
  {
    key: GUEST_ORDER_ROUTES.ROOT,
    icon: <MenuOutlined />,
    label: 'Thực đơn',
  },
  {
    key: GUEST_ORDER_ROUTES.ORDER,
    icon: <ShoppingCartOutlined />,
    label: 'Đơn hàng',
  },
  {
    key: GUEST_ORDER_ROUTES.CALL_STAFF,
    icon: <BellOutlined />,
    label: 'Gọi nhân viên',
  },
]

export { GUEST_ORDER_MENU }
