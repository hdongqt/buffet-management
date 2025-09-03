import Layout from '@/layouts/public/homeLayout'
import React, { Suspense } from 'react'

const HomePage = React.lazy(() => import('@/pages/globalPages/homePage/index'))
const IntroducePage = React.lazy(() => import('@/pages/globalPages/introducePage/index'))
const NotFound = React.lazy(() => import('@/pages/globalPages/notFound/index'))

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
      path: '/introduce',
      element: <IntroducePage />,
    },
    {
      path: '*',
      element: <NotFound />,
    },
  ],
}

const forbiddenRoutes = {
  path: '*',
  element: <NotFound />,
}

export { forbiddenRoutes }
export default globalRoutes
