import { call, put, takeEvery } from 'redux-saga/effects'

import {
  fetchOrdersRequest,
  fetchOrdersSuccess,
  fetchOrdersFailure,
  postOrderSuccess,
  postOrderFailure,
  postOrderRequest,
  putOrderSuccess,
  putOrderFailure,
  putOrderRequest,
  postConfirmOrderRequest,
  postConfirmOrderSuccess,
  postConfirmOrderFailure,
  postCancelOrderRequest,
  postCancelOrderSuccess,
  postCancelOrderFailure,
  putStatusDishRequest,
  putStatusDishFailure,
  putStatusDishSuccess,
  getOrderRequest,
  getOrderSuccess,
  getOrderFailure,
  postDishToOrderSuccess,
  postDishToOrderFailure,
  postDishToOrderRequest,
  getPaymentRequest,
  getPaymentSuccess,
  getPaymentFailure,
  postPaymentRequest,
  putPaymentRequest,
  postPaymentSuccess,
  postPaymentFailure,
  putPaymentSuccess,
  putPaymentFailure,
} from './orderManagerSlice'

import { ORDER_API } from '@/services'
import { showMessage } from '@/sagas/appMessage/appMessageSlice'

import getErrorMessage from '@/utils/getMessage'
import PAYMENT_API from '@/services/payment'

function* fetchOrdersSaga(action) {
  try {
    const { params } = action.payload
    const data = yield call(ORDER_API.fetch, params)
    yield put(fetchOrdersSuccess(data))
  } catch (error) {
    const message = getErrorMessage(error)
    yield put(fetchOrdersFailure(message))
    yield put(showMessage.error(message))
  }
}

function* getOrderSaga(action) {
  try {
    const { id } = action.payload
    const data = yield call(ORDER_API.get, id)
    yield put(getOrderSuccess(data))
  } catch (error) {
    const message = getErrorMessage(error)
    yield put(getOrderFailure(message))
    yield put(showMessage.error(message))
  }
}

function* createOrderSaga(action) {
  try {
    const { values, callback } = action.payload
    const data = yield call(ORDER_API.post, values)
    yield put(postOrderSuccess(data))
    yield put(showMessage.success('Thêm đơn hàng bàn thành công'))
    if (typeof callback === 'function') {
      yield call(callback)
    }
  } catch (error) {
    const message = getErrorMessage(error)
    yield put(showMessage.error(message))
    yield put(postOrderFailure(message))
  }
}

function* updateOrderSaga(action) {
  try {
    const { id, values, callback } = action.payload
    const data = yield call(ORDER_API.put, id, values)
    yield put(putOrderSuccess(data))
    yield put(showMessage.success('Cập nhật đơn hàng bàn thành công'))
    if (typeof callback === 'function') {
      yield call(callback)
    }
  } catch (error) {
    const message = getErrorMessage(error)
    yield put(showMessage.error(message))
    yield put(putOrderFailure(message))
  }
}

function* postConfirmOrderSaga(action) {
  try {
    const { id, callback } = action.payload
    const data = yield call(ORDER_API.postConfirm, id)
    yield put(postConfirmOrderSuccess(data))
    yield put(showMessage.success('Cập nhật đơn hàng bàn thành công'))
    if (typeof callback === 'function') {
      yield call(callback)
    }
  } catch (error) {
    const message = getErrorMessage(error)
    yield put(showMessage.error(message))
    yield put(postConfirmOrderFailure(message))
  }
}

function* postCancelOrderSaga(action) {
  try {
    const { id, callback } = action.payload
    const data = yield call(ORDER_API.postCancel, id)
    yield put(postCancelOrderSuccess(data))
    yield put(showMessage.success('Hủy đơn hàng bàn thành công'))
    if (typeof callback === 'function') {
      yield call(callback)
    }
  } catch (error) {
    const message = getErrorMessage(error)
    yield put(showMessage.error(message))
    yield put(postCancelOrderFailure(message))
  }
}

function* putStatusDishSaga(action) {
  try {
    const { orderId, snapshotId, values, callback } = action.payload
    const data = yield call(
      ORDER_API.putStatusDish,
      orderId,
      snapshotId,
      values
    )
    yield put(putStatusDishSuccess(data))
    yield put(showMessage.success('Cập nhật trang thái món thành công'))
    if (typeof callback === 'function') {
      yield call(callback)
    }
  } catch (error) {
    const message = getErrorMessage(error)
    yield put(showMessage.error(message))
    yield put(putStatusDishFailure(message))
  }
}

function* postDishToOrderSaga(action) {
  const { orderId, dishes, callback } = action.payload
  try {
    const { snapshot } = yield call(ORDER_API.postDish, {
      orderId,
      dishes,
    })
    yield put(postDishToOrderSuccess(snapshot))
    yield put(showMessage.success('Đặt món thành công'))
    if (typeof callback === 'function') {
      yield call(callback)
    }
  } catch (error) {
    const errorMessage = getErrorMessage(error)
    yield put(postDishToOrderFailure(errorMessage))
    yield put(showMessage.error(errorMessage))
  }
}

function* getPaymentSaga(action) {
  try {
    const { id } = action.payload
    const { payment } = yield call(PAYMENT_API.get, id)
    yield put(getPaymentSuccess(payment))
  } catch (error) {
    const message = getErrorMessage(error)
    yield put(getPaymentFailure(message))
    yield put(showMessage.error(message))
  }
}

function* postPaymentSaga(action) {
  try {
    const { id, values, callback } = action.payload
    const { payment } = yield call(PAYMENT_API.post, id, values)
    yield put(postPaymentSuccess(payment))
    if (typeof callback === 'function') {
      yield call(callback)
    }
  } catch (error) {
    const message = getErrorMessage(error)
    yield put(postPaymentFailure(message))
    yield put(showMessage.error(message))
  }
}

function* putPaymentSaga(action) {
  try {
    const { id, callback } = action.payload
    const { payment } = yield call(PAYMENT_API.put, id)
    yield put(putPaymentSuccess(payment))
    yield put(showMessage.success('Thanh toán bàn thành công'))
    if (typeof callback === 'function') {
      yield call(callback)
    }
  } catch (error) {
    const message = getErrorMessage(error)
    yield put(putPaymentFailure(message))
    yield put(showMessage.error(message))
  }
}

export default function* userSaga() {
  yield takeEvery(fetchOrdersRequest.type, fetchOrdersSaga)
  yield takeEvery(getOrderRequest.type, getOrderSaga)
  yield takeEvery(postOrderRequest.type, createOrderSaga)
  yield takeEvery(putOrderRequest.type, updateOrderSaga)
  yield takeEvery(postConfirmOrderRequest.type, postConfirmOrderSaga)
  yield takeEvery(postCancelOrderRequest.type, postCancelOrderSaga)
  yield takeEvery(putStatusDishRequest.type, putStatusDishSaga)
  yield takeEvery(postDishToOrderRequest.type, postDishToOrderSaga)
  yield takeEvery(getPaymentRequest.type, getPaymentSaga)
  yield takeEvery(postPaymentRequest.type, postPaymentSaga)
  yield takeEvery(putPaymentRequest.type, putPaymentSaga)
}
