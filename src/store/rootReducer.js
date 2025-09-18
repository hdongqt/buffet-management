import { combineReducers } from 'redux'
import userReducer from '@/sagas/users/userSlice'
import appMessageReducer from '@/sagas/appMessage/appMessageSlice'
import reservationReducer from '@/sagas/reservation/reservationSlice'
import reservationGuestReducer from '@/sagas/reservationGuest/reservationGuestSlice'
import menuReducer from '@/sagas/menuManagement/menuSlice'
import tableManagerReducer from '@/sagas/tableManager/tableManagerSlice'
import categoriesReducer from '@/sagas/categories/categoriesSlice'
import guestOrderReducer from '@/sagas/guestOrder/guestOrderSlice'
import guestDishReducer from '@/sagas/guestDish/guestDishSlice'
import orderManagerReducer from '@/sagas/orderManager/orderManagerSlice'
import notificationReducer from '@/sagas/notifications/notificationSlice'
import reportManagerReducer from '@/sagas/reportManager/reportManagerSlice'

const rootReducer = combineReducers({
  appMessage: appMessageReducer,
  user: userReducer,
  reservationGuest: reservationGuestReducer,
  reservation: reservationReducer,
  menu: menuReducer,
  tableManager: tableManagerReducer,
  categories: categoriesReducer,
  guestOrder: guestOrderReducer,
  guestDish: guestDishReducer,
  orderManager: orderManagerReducer,
  notifications: notificationReducer,
  reportManager: reportManagerReducer,
})

export default rootReducer
