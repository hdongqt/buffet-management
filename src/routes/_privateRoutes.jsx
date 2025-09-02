import PrivateLayout from '@/layouts/private/PrivateLayout'
import { checkRouterAccess } from '@/utils/checkRoule'
import React, { Suspense } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { ADMIN_ROUTES, STAFF_ROUTES } from './listRoutes'
import { StaffTableManagement } from '@/pages/privatePages/staff'
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

const staffRoutes = {
  path: STAFF_ROUTES.ROOT,
  element: (
    <Suspense fallback={<div>Loading...</div>}>
      <ProtectedRoute>
        <PrivateLayout />
      </ProtectedRoute>
    </Suspense>
  ),
  children: [
    {
      index: STAFF_ROUTES.ROOT,
      element: <StaffTableManagement />,
    },
    {
      path: `${STAFF_ROUTES.ROOT}/:id`,
      element: <StaffTableManagement />,
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

const privateRoutes = [staffRoutes, adminRoutes]

export default privateRoutes
