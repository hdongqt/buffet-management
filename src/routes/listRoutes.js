const STAFF_ROUTES = {
  ROOT: '/staff',
  MENUS: '/staff/menus',
}

const ADMIN_ROUTES = {
  ROOT: '/admin',
  TABLES: '/admin/tables',
  MENUS: '/admin/menus',
}

const ROLE_PERMISSIONS = {
  STAFF: [...Object.values(STAFF_ROUTES)],
  ADMIN: [...Object.values(ADMIN_ROUTES)],
}

export { STAFF_ROUTES, ADMIN_ROUTES, ROLE_PERMISSIONS }
