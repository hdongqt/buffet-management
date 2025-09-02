import { StyleLayout } from '@/layouts/public/authLayout/styled'
import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
  return (
    <StyleLayout> 
        <Outlet /> 
    </StyleLayout>
  )
}

export default AuthLayout
