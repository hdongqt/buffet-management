import { Outlet } from 'react-router-dom'
import UserHeader from '@/components/userHeader'
import UserFooter from '@/components/userFooter'
import ScrollTop from '@/components/scrollTop'

import { StyledLayout } from './styled'

export default function Layout() {
  return (
    <StyledLayout>
      <UserHeader />
      <Outlet />
      <UserFooter />
      <ScrollTop />
    </StyledLayout>
  )
}
