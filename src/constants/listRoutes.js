const USER_ROUTES = {
  ROOT: '/',
  ABOUT: '/about',
  MENU: '/menu',
  RESERVATION: '/reservation',
  CONTACT: '/contact',
  NEWS: '/news',
}

const MANAGER_ROUTES = {
  ROOT: '/manager',
  MENUS: '/manager/menus',
  RESERVATION: '/manager/reservation',
}

const ADMIN_ROUTES = {
  ROOT: '/admin',
  TABLES: '/admin/tables',
  MENUS: '/admin/menus',
}

const ROLE_PERMISSIONS = {
  MANAGER: [...Object.values(MANAGER_ROUTES)],
  ADMIN: [...Object.values(ADMIN_ROUTES)],
}

export { USER_ROUTES, MANAGER_ROUTES, ADMIN_ROUTES, ROLE_PERMISSIONS }

