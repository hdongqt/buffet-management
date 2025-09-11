import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'

import {
  checkTableQRFailure,
  checkTableQRRequest,
  checkTableQRSuccess,
  getOrderDetailFailure,
  getOrderDetailRequest,
  getOrderDetailSuccess,
  guestCreateOrderFailure,
  guestCreateOrderRequest,
  guestCreateOrderSuccess,
} from './guestOrderSlice'

import { GUESTS_API } from '@/services/index'
import getErrorMessage from '@/utils/getMessage'

function* handleCheckTableQR(action) {
  const { values, callback } = action.payload
  try {
    const { order, table } = yield call(GUESTS_API.checkQRTable, values)
    yield put(checkTableQRSuccess({ order }))
    if (order) {
      localStorage.setItem('guestOrder', order?.id)
    }
    if (callback) {
      callback({ order, table })
    }
  } catch (error) {
    const errorMessage = getErrorMessage(error, 'QR không hợp lệ')
    yield put(checkTableQRFailure(errorMessage))
  }
}

function* handleCreateOrder(action) {
  const { values, callback } = action.payload
  try {
    const { order } = yield call(GUESTS_API.createOrder, values)
    if (order) {
      localStorage.setItem('guestOrder', order?.id)
    }
    yield put(guestCreateOrderSuccess({ order }))
    if (callback) {
      callback()
    }
  } catch (error) {
    const errorMessage = getErrorMessage(error)
    yield put(guestCreateOrderFailure(errorMessage))
  }
}

function* handleGetOrderDetail(action) {
  const { id, callback } = action.payload
  try {
    const { order } = yield call(GUESTS_API.getOrderDetail, id)
    yield put(getOrderDetailSuccess({ order }))
    if (callback) {
      callback(true)
    }
  } catch (error) {
    const errorMessage = getErrorMessage(error)
    yield put(getOrderDetailFailure(errorMessage))
    if (callback) {
      callback(false)
    }
  }
}

export default function* guestOrderSaga() {
  yield takeEvery(checkTableQRRequest.type, handleCheckTableQR)
  yield takeEvery(guestCreateOrderRequest.type, handleCreateOrder)
  yield takeLatest(getOrderDetailRequest.type, handleGetOrderDetail)
}
