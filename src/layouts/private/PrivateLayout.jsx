import { Outlet, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { Typography, Layout, Divider } from 'antd'
import { Private } from './styled'

import { ADMIN_MENU, MANAGER_MENU } from '@/components/menu/privateMenu'
import PrivateHeader from '@/components/privateHeader/index'
import PrivateSidebar from '@/components/privateSidebar/index'
import ROLES from '@/constants/roles'

function PrivateLayout() {
  const { user } = useSelector((state) => state.user)
  const [collapsed, setCollapsed] = useState(false)
  const pathname = useLocation().pathname

  const LIST_TITLE = user?.role === ROLES.ADMIN ? ADMIN_MENU : MANAGER_MENU
  const currentPath = LIST_TITLE.find((item) => item.key === pathname)

  return (
    <Private.Layout>
      <PrivateSidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <Layout>
        <PrivateHeader collapsed={collapsed} setCollapsed={setCollapsed} />
        <Layout.Content className='home-layout__content'>
          <Private.Content>
            <Typography.Title level={3}>{currentPath?.title}</Typography.Title>
            <Divider />
            <Outlet />
          </Private.Content>
        </Layout.Content>
      </Layout>
    </Private.Layout>
  )
}
export default PrivateLayout
