import { ROLE_PERMISSIONS } from '@/constants/listRoutes'

const checkRouterAccess = (path, role) => {
  if (!role || !path) {
    return false
  }

  const permissions = ROLE_PERMISSIONS?.[role]
  if (!permissions) {
    return false
  }

  const findRouteMatch = permissions.find((route) => path.startsWith(route))
  if (!findRouteMatch) {
    return false
  }

  return true
}

export { checkRouterAccess }
