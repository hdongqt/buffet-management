import React, { Suspense } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

import { ADMIN_ROUTES, MANAGER_ROUTES } from '../constants/listRoutes'

import PrivateLayout from '@/layouts/private/PrivateLayout'
import {
  TableManagement,
  MenuManagement,
  TableReservationManagement,
  CategoriesManagement,
  OrderManagement,
  Dashboard,
} from '@/pages/privatePages'
import LazyLoading from '@/components/lazyLoading'

import { checkRouterAccess } from '@/utils/checkRole'

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
    <Suspense fallback={<LazyLoading />}>
      <ProtectedRoute>
        <PrivateLayout />
      </ProtectedRoute>
    </Suspense>
  ),
  children: [
    {
      index: MANAGER_ROUTES.ROOT,
      element: <Dashboard />,
    },
    {
      path: MANAGER_ROUTES.TABLES,
      element: <TableManagement />,
    },
    {
      path: MANAGER_ROUTES.MENUS,
      element: <MenuManagement />,
    },
    {
      path: MANAGER_ROUTES.RESERVATION,
      element: <TableReservationManagement />,
    },
    {
      path: MANAGER_ROUTES.CATEGORIES,
      element: <CategoriesManagement />,
    },
    {
      path: MANAGER_ROUTES.ORDERS,
      element: <OrderManagement />,
    },
  ],
}

const adminRoutes = {
  path: ADMIN_ROUTES.ROOT,
  element: (
    <Suspense fallback={<LazyLoading />}>
      <ProtectedRoute>
        <PrivateLayout />
      </ProtectedRoute>
    </Suspense>
  ),
  children: [
    {
      index: true,
      element: <Dashboard />,
    },
  ],
}

const privateRoutes = [managerRoutes, adminRoutes]

export default privateRoutes
