import { Outlet } from 'react-router-dom'
import { StyledLayout } from './styled'
import UserHeader from '@/components/userHeader'
import UserFooter from '@/components/userFooter'

export default function Layout() {
  return (
    <StyledLayout>
      <UserHeader />
      <Outlet />
      <UserFooter />
    </StyledLayout>
  )
}
