import { all } from 'redux-saga/effects'
import userSaga from '../sagas/users/userSaga'
import reservationSaga from '@/sagas/reservation/reservationSaga'
import tableManagerSaga from '../sagas/tableManager/tableManagerSaga'

// Root saga
function* rootSaga() {
  yield all([userSaga(), reservationSaga(), tableManagerSaga()])
}

export default rootSaga
