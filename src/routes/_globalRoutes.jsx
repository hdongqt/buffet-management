import { USER_ROUTES } from '@/constants/listRoutes'
import Layout from '@/layouts/public/homeLayout'
import React, { Suspense } from 'react'

const HomePage = React.lazy(() => import('@/pages/globalPages/homePage/index'))
const NotFound = React.lazy(() => import('@/pages/globalPages/notFound/index'))
const IntroducePage = React.lazy(() => import('@/pages/globalPages/aboutPage'))
const MenuPage = React.lazy(() =>
  import('@/pages/globalPages/menuPage/MenuPage')
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
      element: <IntroducePage />,
    },
    {
      path: USER_ROUTES.MENU,
      element: <MenuPage />,
    },
  ],
}

const forbiddenRoutes = {
  path: '*',
  element: <NotFound />,
}

export { forbiddenRoutes }
export default globalRoutes
