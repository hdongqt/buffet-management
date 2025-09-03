import PrivateLayout from '@/layouts/private/PrivateLayout'
import { checkRouterAccess } from '@/utils/checkRoule'
import React, { Suspense } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { ADMIN_ROUTES, MANAGER_ROUTES } from '../constants/listRoutes'
import { ManagerTableManagement } from '@/pages/privatePages/manager'
import { AdminDashboard } from '@/pages/privatePages/admin'

const ProtectedRoute = ({ children }) => {
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

const managerRoutes = {
  path: MANAGER_ROUTES.ROOT,
  element: (
    <Suspense fallback={<div>Loading...</div>}>
      <ProtectedRoute>
        <PrivateLayout />
      </ProtectedRoute>
    </Suspense>
  ),
  children: [
    {
      index: MANAGER_ROUTES.ROOT,
      element: <ManagerTableManagement />,
    },
  ],
}

const adminRoutes = {
  path: ADMIN_ROUTES.ROOT,
  element: (
    <Suspense fallback={<div>Loading...</div>}>
      <ProtectedRoute>
        <PrivateLayout />
      </ProtectedRoute>
    </Suspense>
  ),
  children: [
    {
      index: true,
      element: <AdminDashboard />,
    },
  ],
}

const privateRoutes = [managerRoutes, adminRoutes]

export default privateRoutes
