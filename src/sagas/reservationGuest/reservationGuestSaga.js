import { call, put, takeLatest } from 'redux-saga/effects'
import {
  reservationGuestRequest,
  reservationGuestSuccess,
  reservationGuestFailure,
} from './reservationGuestSlice'
import { showMessage } from '../appMessage/appMessageSlice'
import getErrorMessage from '@/utils/getMessage'
import RESERVATION_GUEST_API from '@/services/guest'

function* handleCreateReservationGuest(action) {
  try {
    const { values } = action.payload
    const response = yield call(RESERVATION_GUEST_API.post, values)
    yield put(reservationGuestSuccess(response))
    yield put(showMessage.success('Đặt bàn thành công!'))
  } catch (error) {
    const errorMessage = getErrorMessage(error)
    yield put(reservationGuestFailure(errorMessage))
    yield put(showMessage.error(errorMessage))
  }
}

export default function* reservationSaga() {
  yield takeLatest(reservationGuestRequest.type, handleCreateReservationGuest)
}
