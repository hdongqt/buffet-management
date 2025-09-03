import { ROLE_PERMISSIONS } from '@/constants/listRoutes'

const checkRouterAccess = (path, role) => {
  if (!role || !path) return false
  const permissions = ROLE_PERMISSIONS?.[role]
  const findRouteMatch = permissions.find((route) => path.startsWith(route))
  if (!permissions || !findRouteMatch) return false
  return true
}

export { checkRouterAccess }
