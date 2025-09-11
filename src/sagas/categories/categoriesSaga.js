import { call, put, takeLatest } from 'redux-saga/effects'
import { showMessage } from '../appMessage/appMessageSlice'
import getErrorMessage from '@/utils/getMessage'
import CATEGORIES_API from '@/services/categories'
import {
  createCategoriesFailure,
  createCategoriesRequest,
  createCategoriesSuccess,
  deleteCategoriesFailure,
  deleteCategoriesRequest,
  fetchCategoriesFailure,
  fetchCategoriesRequest,
  fetchCategoriesSuccess,
  updateCategoriesFailure,
  updateCategoriesRequest,
  updateCategoriesSuccess,
} from './categoriesSlice'

function* handleFetchCategories(action) {
  try {
    const { params } = action.payload
    const response = yield call(CATEGORIES_API.get, params)
    const { categories, pagination } = response
    yield put(
      fetchCategoriesSuccess({
        categoriesList: categories,
        pagination: pagination,
      })
    )
  } catch (error) {
    const message = getErrorMessage(error)
    yield put(fetchCategoriesFailure(message))
    yield put(showMessage.error(message))
  }
}

function* handleCreateCategories(action) {
  try {
    const { values, callback } = action.payload
    const response = yield call(CATEGORIES_API.post, values)
    yield put(createCategoriesSuccess(response))
    yield put(showMessage.success('Thêm danh mục thành công!'))
    if (typeof callback === 'function') {
      yield call(callback)
    }
  } catch (error) {
    const errorMessage = getErrorMessage(error)
    yield put(createCategoriesFailure(errorMessage))
    yield put(showMessage.error(errorMessage))
  }
}

function* handleUpdateCategories(action) {
  try {
    const { id, values, callback } = action.payload
    const response = yield call(CATEGORIES_API.put, id, values)
    yield put(updateCategoriesSuccess(response))
    yield put(showMessage.success('Cập nhật thành công!'))

    if (typeof callback === 'function') {
      yield call(callback)
    }
  } catch (error) {
    const errorMessage = getErrorMessage(error)
    yield put(updateCategoriesFailure(errorMessage))
    yield put(showMessage.error(errorMessage))
  }
}

function* handleDeleteCategories(action) {
  try {
    const { id, callback } = action.payload
    yield call(CATEGORIES_API.delete, id)
    yield put(showMessage.success('Xoá danh mục thành công!'))
    if (typeof callback === 'function') {
      yield call(callback)
    }
  } catch (error) {
    const errorMessage = getErrorMessage(error)
    yield put(deleteCategoriesFailure(errorMessage))
    yield put(showMessage.error(errorMessage))
  }
}

export default function* categoriesSaga() {
  yield takeLatest(fetchCategoriesRequest.type, handleFetchCategories)
  yield takeLatest(updateCategoriesRequest.type, handleUpdateCategories)
  yield takeLatest(createCategoriesRequest.type, handleCreateCategories)
  yield takeLatest(deleteCategoriesRequest.type, handleDeleteCategories)
}
