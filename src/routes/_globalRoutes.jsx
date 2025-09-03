import Layout from '@/layouts/public/homeLayout'
import React, { Suspense } from 'react'

const HomePage = React.lazy(() => import('@/pages/globalPages/homePage/index'))
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
  ],
}

const forbiddenRoutes = {
  path: '*',
  element: <NotFound />,
}

export { forbiddenRoutes }
export default globalRoutes
