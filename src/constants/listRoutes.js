const USER_ROUTES = {
  ROOT: '/',
  ABOUT: '/about',
  MENU: '/menu',
  RESERVATION: '/reservation',
  CONTACT: '/contact',
  NEWS: '/news',
  INTRO_QR: '/intro-qr',
}

const GUEST_ORDER_ROUTES = {
  GUEST_TABLE: '/table/:token',
  ROOT: '/guest-order',
  ORDER: '/guest-order/order',
  CALL_STAFF: '/guest-order/call-staff',
}

const MANAGER_ROUTES = {
  ROOT: '/manager',
  TABLES: '/manager/tables',
  DASHBOARD: '/manager/dashboard',
  MENUS: '/manager/menus',
  RESERVATION: '/manager/reservation',
  CATEGORIES: '/manager/categories',
  ORDERS: '/manager/orders',
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

export {
  USER_ROUTES,
  GUEST_ORDER_ROUTES,
  MANAGER_ROUTES,
  ADMIN_ROUTES,
  ROLE_PERMISSIONS,
}
