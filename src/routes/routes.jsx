import { useRoutes } from 'react-router-dom'
import privateRoutes from './_privateRoutes'
import publicRoutes from './_publicRoutes'
import globalRoutes, { forbiddenRoutes } from './_globalRoutes'
import guestRoutes from './_guestRoutes'

function AppRoutes() {
  return useRoutes([
    globalRoutes,
    ...privateRoutes,
    publicRoutes,
    ...guestRoutes,
    forbiddenRoutes,
  ])
}

export default AppRoutes
