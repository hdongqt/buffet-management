import RESERVATION_API from '@/services/reservation'
import { call, put, takeLatest } from 'redux-saga/effects'
import {
  reservationFailure,
  reservationSuccess,
  reservationRequest,
  getReservationSuccess,
  getReservationFailure,
  getReservationRequest,
  updateReservationSuccess,
  updateReservationFailure,
  updateReservationRequest,
  getTableAvailableSuccess,
  getTableAvailableFailure,
  getTableAvailableRequest,
} from './reservationSlice'
import { showMessage } from '../appMessage/appMessageSlice'
import getErrorMessage from '@/utils/getMessage'

function* handleCreateReservation(action) {
  try {
    const { values, callback } = action.payload
    const response = yield call(RESERVATION_API.post, values)
    yield put(reservationSuccess(response))
    yield put(showMessage.success('Đặt bàn thành công!'))
    if (typeof callback === 'function') {
      yield call(callback)
    }
  } catch (error) {
    const errorMessage = getErrorMessage(error)
    yield put(reservationFailure(errorMessage))
    yield put(showMessage.error(errorMessage))
  }
}

function* handleGetReservation(action) {
  try {
    const { params } = action.payload
    const response = yield call(RESERVATION_API.get, params)
    const { reservations, pagination } = response
    yield put(
      getReservationSuccess({
        reservationList: reservations,
        pagination: pagination,
      })
    )
  } catch (error) {
    const errorMessage = getErrorMessage(error)
    yield put(getReservationFailure(errorMessage))
    yield put(showMessage.error(errorMessage))
  }
}

function* handleUpdateReservation(action) {
  try {
    const { id, values, callback } = action.payload
    const response = yield call(RESERVATION_API.put, id, values)
    yield put(updateReservationSuccess(response))
    yield put(showMessage.success('Cập nhật thành công!'))
    if (typeof callback === 'function') {
      yield call(callback)
    }
  } catch (error) {
    const errorMessage = getErrorMessage(error)
    yield put(updateReservationFailure(errorMessage))
    yield put(showMessage.error(errorMessage))
  }
}

function* handleGetTableAvailable(action) {
  try {
    const { dateBooking, timeBooking, numPeople } = action.payload || {}
    const res = yield call(
      RESERVATION_API.getTableAvailable,
      dateBooking,
      timeBooking,
      numPeople
    )
    yield put(getTableAvailableSuccess(res.availableTables || []))
  } catch (error) {
    const errorMessage = getErrorMessage(error)
    yield put(getTableAvailableFailure(errorMessage))
    yield put(showMessage.error(errorMessage))
  }
}

export default function* reservationSaga() {
  yield takeLatest(reservationRequest.type, handleCreateReservation)
  yield takeLatest(getReservationRequest.type, handleGetReservation)
  yield takeLatest(updateReservationRequest.type, handleUpdateReservation)
  yield takeLatest(getTableAvailableRequest.type, handleGetTableAvailable)
}
