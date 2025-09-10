import { USER_ROUTES } from '@/constants/listRoutes'
import Layout from '@/layouts/public/homeLayout'
import React, { Suspense } from 'react'

const HomePage = React.lazy(() => import('@/pages/globalPages/homePage'))
const NotFound = React.lazy(() => import('@/pages/globalPages/notFound'))
const AboutPage = React.lazy(() => import('@/pages/globalPages/aboutPage'))
const MenuPage = React.lazy(() => import('@/pages/globalPages/menuPage'))
const ReservationPage = React.lazy(() =>
  import('@/pages/globalPages/reservationPage')
)

const globalRoutes = {
  path: '/',
  element: (
    <Suspense fallback={<div>Loading...</div>}>
      <Layout />
    </Suspense>
  ),
  children: [
    {
      index: true,
      element: <HomePage />,
    },
    {
      path: USER_ROUTES.ABOUT,
      element: <AboutPage />,
    },
    {
      path: USER_ROUTES.MENU,
      element: <MenuPage />,
    },

    {
      path: USER_ROUTES.RESERVATION,
      element: <ReservationPage />,
    },
  ],
}

const forbiddenRoutes = {
  path: '*',
  element: <NotFound />,
}

export { forbiddenRoutes }
export default globalRoutes
