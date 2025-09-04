import { Outlet } from 'react-router-dom'
import { Layout } from 'antd'
import { useState } from 'react'

import PrivateHeader from '@/components/privateHeader/index'
import PrivateSidebar from '@/components/privateSidebar/index'
import { ContentStyle, PrivateLayoutStyle } from './styled'
import { Typography } from 'antd'
import { Divider } from 'antd'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import ROLES from '@/constants/roles'
import { ADMIN_MENU, STAFF_MENU } from '@/constants/privateMenu'

function PrivateLayout() {
  const { user } = useSelector((state) => state.user)
  const [collapsed, setCollapsed] = useState(false)
  const pathname = useLocation().pathname

  const LIST_TITLE = user?.role === ROLES.ADMIN ? ADMIN_MENU : STAFF_MENU
  const currentPath = LIST_TITLE.find((item) => item.key === pathname)

  return (
    <PrivateLayoutStyle>
      <PrivateSidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <Layout>
        <PrivateHeader collapsed={collapsed} setCollapsed={setCollapsed} />
        <Layout.Content className='home-layout__content'>
          <ContentStyle>
            <Typography.Title level={3}>{currentPath?.title}</Typography.Title>
            <Divider />
            <Outlet />
          </ContentStyle>
        </Layout.Content>
      </Layout>
    </PrivateLayoutStyle>
  )
}
export default PrivateLayout
