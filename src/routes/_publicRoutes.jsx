import AuthLayout from '@/layouts/public/authLayout/AuthLayout'
import React, { Suspense } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { ADMIN_ROUTES, MANAGER_ROUTES } from '../constants/listRoutes'
import ROLES from '@/constants/roles'

const LoginPage = React.lazy(() =>
  import('@/pages/publicPages/login/LoginPage')
)

const AuthRoute = ({ children }) => {
  const { user } = useSelector((state) => state.user)
  if (user) {
    const role = user?.role
    const urlRedirect =
      role === ROLES.ADMIN ? ADMIN_ROUTES.ROOT : MANAGER_ROUTES.ROOT
    return <Navigate to={urlRedirect} replace />
  }
  return children
}

const publicRoutes = {
  element: (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthRoute>
        <AuthLayout />
      </AuthRoute>
    </Suspense>
  ),
  children: [{ path: '/login', element: <LoginPage /> }],
}

export default publicRoutes
