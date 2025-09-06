import { all } from 'redux-saga/effects'
import userSaga from '../sagas/users/userSaga'
import reservationSaga from '@/sagas/reservation/reservationSaga'

// Root saga
function* rootSaga() {
  yield all([userSaga(), reservationSaga()])
}

export default rootSaga

