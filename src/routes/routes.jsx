import { useRoutes } from 'react-router-dom'
import privateRoutes from './_privateRoutes'
import publicRoutes from './_publicRoutes'
import globalRoutes from './_globalRoutes'

function AppRoutes() {
  return useRoutes([globalRoutes, ...privateRoutes, publicRoutes])
}

export default AppRoutes
