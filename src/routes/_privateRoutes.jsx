import React, { Suspense } from 'react'

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
import ProtectedPrivateRoute from '@/routes/guards/protectPrivateRoute'

const managerRoutes = {
  path: MANAGER_ROUTES.ROOT,
  element: (
    <Suspense fallback={<LazyLoading />}>
      <ProtectedPrivateRoute>
        <PrivateLayout />
      </ProtectedPrivateRoute>
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
      <ProtectedPrivateRoute>
        <PrivateLayout />
      </ProtectedPrivateRoute>
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
