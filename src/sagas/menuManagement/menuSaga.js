import { call, put, takeLatest } from 'redux-saga/effects'
import { showMessage } from '@/sagas/appMessage/appMessageSlice'
import {
  fetchMenuListSuccess,
  fetchMenuListFailure,
  fetchMenuListRequest,
  getMenuSuccess,
  getMenuFailure,
  getMenuRequest,
  postMenuRequest,
  postMenuSuccess,
  postMenuFailure,
  putMenuRequest,
  putMenuSuccess,
  putMenuFailure,
  deleteMenuRequest,
  deleteMenuSuccess,
  deleteMenuFailure,
} from '@/sagas/menuManagement/menuSlice'
import MENUS_API from '@/services/menuManagement'

import getErrorMessage from '@/utils/getMessage'

function* fetchMenuListSaga(action) {
  try {
    const { params } = action.payload || {}
    const { dishes, pagination } = yield call(MENUS_API.getList, params)
    yield put(fetchMenuListSuccess({ dishes, pagination }))
  } catch (error) {
    const errorMessage = getErrorMessage(error, 'Không lấy được danh sách menu')
    yield put(fetchMenuListFailure(errorMessage))
    yield put(showMessage.error(errorMessage))
  }
}

function* getMenuSaga(action) {
  try {
    const { id } = action.payload
    const { dish } = yield call(MENUS_API.getById, id)
    yield put(getMenuSuccess(dish))
  } catch (error) {
    const errorMessage = getErrorMessage(
      error,
      'Không lấy được thông tin món ăn'
    )
    yield put(getMenuFailure(errorMessage))
    yield put(showMessage.error(errorMessage))
  }
}

function* createMenuSaga(action) {
  try {
    const { values, callback } = action.payload
    const { dish } = yield call(MENUS_API.post, values)
    yield put(postMenuSuccess(dish))
    yield put(showMessage.success('Thêm món ăn thành công'))
    if (typeof callback === 'function') {
      yield call(callback)
    }
  } catch (error) {
    const errorMessage = getErrorMessage(error, 'Thêm mới món ăn thất bại')
    yield put(postMenuFailure(errorMessage))
    yield put(showMessage.error(errorMessage))
  }
}

function* updateMenuSaga(action) {
  const { id, values, callback } = action.payload

  try {
    const { dish } = yield call(MENUS_API.put, id, values)
    yield put(putMenuSuccess(dish))
    yield put(showMessage.success('Cập nhật món ăn thành công'))
    if (typeof callback === 'function') {
      yield call(callback)
    }
  } catch (error) {
    const errorMessage = getErrorMessage(error, 'Cập nhật món ăn thất bại')
    yield put(putMenuFailure(errorMessage))
    yield put(showMessage.error(errorMessage))
  }
}

function* deleteMenuSaga(action) {
  try {
    const { id, callback } = action.payload
    yield call(MENUS_API.delete, id)
    yield put(deleteMenuSuccess(id))
    yield put(showMessage.success('Xóa món ăn thành công'))
    if (typeof callback === 'function') {
      yield call(callback)
    }
  } catch (error) {
    const errorMessage = getErrorMessage(error, 'Xóa món ăn thất bại')
    yield put(deleteMenuFailure(errorMessage))
    yield put(showMessage.error(errorMessage))
  }
}

export default function* menuSaga() {
  yield takeLatest(fetchMenuListRequest.type, fetchMenuListSaga)
  yield takeLatest(getMenuRequest.type, getMenuSaga)
  yield takeLatest(postMenuRequest.type, createMenuSaga)
  yield takeLatest(putMenuRequest.type, updateMenuSaga)
  yield takeLatest(deleteMenuRequest.type, deleteMenuSaga)
}
