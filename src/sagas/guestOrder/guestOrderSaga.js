import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'

import {
  addDishToOrderFailure,
  addDishToOrderRequest,
  addDishToOrderSuccess,
  callStaffFailure,
  callStaffRequest,
  callStaffSuccess,
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
import { showMessage } from '../appMessage/appMessageSlice'

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
    const extraDishes = order?.normalDishes || []
    const comboDish = order?.combo || null
    yield put(
      getOrderDetailSuccess({
        order,
        extraDishes,
        comboDish,
        totalPrice: order?.totalPrice || 0,
      })
    )
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

function* handleAddDishToOrder(action) {
  const { orderId, dishes, callback } = action.payload
  try {
    const { snapshot } = yield call(GUESTS_API.addDish, {
      orderId,
      dishes,
    })
    yield put(addDishToOrderSuccess(snapshot))
    yield put(showMessage.success('Đặt món thành công'))
    if (callback) {
      callback()
    }
  } catch (error) {
    const errorMessage = getErrorMessage(error)
    yield put(addDishToOrderFailure(errorMessage))
    yield put(showMessage.error(errorMessage))
  }
}

function* handleCallStaff(action) {
  const { orderId, note, callback } = action.payload
  try {
    yield call(GUESTS_API.callStaff, { orderId, note })
    yield put(callStaffSuccess())
    yield put(showMessage.success('Gọi nhân viên thành công'))
    if (callback) {
      callback()
    }
  } catch (error) {
    const errorMessage = getErrorMessage(error, 'Gọi nhân viên thất bại')
    yield put(callStaffFailure(errorMessage))
    yield put(showMessage.error(errorMessage))
  }
}

export default function* guestOrderSaga() {
  yield takeEvery(checkTableQRRequest.type, handleCheckTableQR)
  yield takeEvery(guestCreateOrderRequest.type, handleCreateOrder)
  yield takeLatest(getOrderDetailRequest.type, handleGetOrderDetail)
  yield takeEvery(addDishToOrderRequest.type, handleAddDishToOrder)
  yield takeLatest(callStaffRequest.type, handleCallStaff)
}
