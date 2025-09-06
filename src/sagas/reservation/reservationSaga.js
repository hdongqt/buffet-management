import RESERVATION_API from '@/services/reservation'
import { call, put, takeLatest } from 'redux-saga/effects'
import {
  reservationFailure,
  reservationSuccess,
  reservationRequest,
} from './reservationSlice'
import { showMessage } from '../appMessage/appMessageSlice'

function* handleCreateReservation(action) {
  try {
    const { values } = action.payload
    const response = yield call(RESERVATION_API.post, values)
    yield put(reservationSuccess(response))
    yield put(showMessage.success('Đặt bàn thành công!'))
  } catch (error) {
    yield put(reservationFailure(error.message))
    yield put(showMessage.error('Lỗi server, vui lòng thử lại sau!'))
  }
}

export default function* reservationSaga() {
  yield takeLatest(reservationRequest.type, handleCreateReservation)
}
