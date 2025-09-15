import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

import { checkRouterAccess } from '@/utils/checkRole'

const ProtectedPrivateRoute = ({ children }) => {
  const { user } = useSelector((state) => state.user)
  if (!user) {
    return <Navigate to='/login' replace />
  }
  const role = user?.role ? user.role.toUpperCase() : null
  const path = window.location.pathname
  const isAccess = checkRouterAccess(path, role)
  if (!isAccess) {
    return <Navigate to='/' replace />
  }
  return children
}

export default ProtectedPrivateRoute
