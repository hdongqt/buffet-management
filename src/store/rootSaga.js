import { all } from 'redux-saga/effects'
import userSaga from '../sagas/users/userSaga'

// Root saga
function* rootSaga() {
  yield all([userSaga()])
}

export default rootSaga
