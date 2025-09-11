import React, { Suspense } from 'react'
import { Outlet } from 'react-router-dom'

import { GUEST_ORDER_ROUTES, USER_ROUTES } from '@/constants/listRoutes'
import GuestOrderLayout from '@/layouts/public/guestOrderLayout'
import { ProtectedGuestOrderRoute } from '@/components/protectRoute'
import LazyLoading from '@/components/lazyLoading'

const GuestMenuOrder = React.lazy(() =>
  import('@/pages/globalPages/guestMenuOrder')
)
const GuestTableQRPage = React.lazy(() =>
  import('@/pages/publicPages/guestTableQRPage')
)
const GuestOrder = React.lazy(() => import('@/pages/globalPages/guestOrder'))
const GuestCallStaff = React.lazy(() =>
  import('@/pages/globalPages/guestCallStaff')
)

const guestTableRoutes = {
  path: USER_ROUTES.GUEST_TABLE,
  element: (
    <Suspense fallback={<LazyLoading />}>
      <Outlet />
    </Suspense>
  ),
  children: [
    {
      index: true,
      element: <GuestTableQRPage />,
    },
  ],
}

const guestOrderRoutes = {
  path: GUEST_ORDER_ROUTES.ROOT,
  element: (
    <Suspense fallback={<LazyLoading />}>
      <ProtectedGuestOrderRoute>
        <GuestOrderLayout />
      </ProtectedGuestOrderRoute>
    </Suspense>
  ),
  children: [
    {
      path: GUEST_ORDER_ROUTES.ROOT,
      element: <GuestMenuOrder />,
    },
    {
      path: GUEST_ORDER_ROUTES.ORDER,
      element: <GuestOrder />,
    },
    {
      path: GUEST_ORDER_ROUTES.CALL_STAFF,
      element: <GuestCallStaff />,
    },
  ],
}

const guestRoutes = [guestTableRoutes, guestOrderRoutes]

export default guestRoutes
