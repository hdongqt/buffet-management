import { all } from 'redux-saga/effects'
import userSaga from '../sagas/users/userSaga'
import reservationSaga from '@/sagas/reservation/reservationSaga'
import reservationGuestSaga from '@/sagas/reservationGuest/reservationGuestSaga'
import tableManagerSaga from '../sagas/tableManager/tableManagerSaga'
import menuSaga from '@/sagas/menuManagement/menuSaga'

// Root saga
function* rootSaga() {
  yield all([
    userSaga(),
    reservationSaga(),
    tableManagerSaga(),
    menuSaga(),
    reservationGuestSaga(),
  ])
}

export default rootSaga

