
import { Outlet } from 'react-router-dom'
import { StyledLayout } from './styled'

export default function Layout() {
  return (
    <StyledLayout>
        <Outlet />
    </StyledLayout>
  )
}
