import { combineReducers } from 'redux'
import userReducer from '@/sagas/users/userSlice'
import appMessageReducer from '@/sagas/appMessage/appMessageSlice'

const rootReducer = combineReducers({
  appMessage: appMessageReducer,
  user: userReducer,
})

export default rootReducer
