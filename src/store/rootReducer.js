import { combineReducers } from 'redux'
import userReducer from '@/sagas/users/userSlice'
import appMessageReducer from '@/sagas/appMessage/appMessageSlice'
import reservationReducer from '@/sagas/reservation/reservationSlice'
import menuReducer from '@/sagas/menuManagement/menuSlice'
import tableManagerReducer from '@/sagas/tableManager/tableManagerSlice'

const rootReducer = combineReducers({
  appMessage: appMessageReducer,
  user: userReducer,
  reservation: reservationReducer,
  menu: menuReducer,
  tableManager: tableManagerReducer,
})

export default rootReducer
