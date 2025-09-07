import { combineReducers } from 'redux'
import userReducer from '@/sagas/users/userSlice'
import appMessageReducer from '@/sagas/appMessage/appMessageSlice'
import reservationReducer from '@/sagas/reservation/reservationSlice'

const rootReducer = combineReducers({
  appMessage: appMessageReducer,
  user: userReducer,
  reservation: reservationReducer,
})

export default rootReducer

