import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'

import {
  fetchDishesRequest,
  fetchDishesSuccess,
  fetchDishesFailure,
  fetchCategoriesRequest,
  fetchCategoriesSuccess,
  fetchCategoriesFailure,
  fetchComboDishesRequest,
  fetchComboDishesSuccess,
  fetchComboDishesFailure,
} from './guestDishSlice'

import { GUESTS_API } from '@/services'
import { showMessage } from '@/sagas/appMessage/appMessageSlice'

import getErrorMessage from '@/utils/getMessage'

function* handleFetchDishes(action) {
  try {
    const { params } = action.payload
    const { dishes, pagination } = yield call(GUESTS_API.getListDish, params)
    yield put(fetchDishesSuccess({ dishes, pagination }))
  } catch (error) {
    const message = getErrorMessage(error)
    yield put(fetchDishesFailure(message))
    yield put(showMessage.error(message))
  }
}

export function* handleFetchCategories() {
  try {
    const { categories } = yield call(GUESTS_API.getCategories, {
      page: 1,
      limit: 100,
    })
    yield put(fetchCategoriesSuccess(categories))
  } catch (error) {
    const message = getErrorMessage(error)
    yield put(fetchCategoriesFailure(message))
    yield put(showMessage.error(message))
  }
}

export function* handleFetchComboDishes() {
  try {
    const { dishes } = yield call(GUESTS_API.getComboList, {
      page: 1,
      limit: 50,
      isCombo: true,
    })
    yield put(fetchComboDishesSuccess(dishes))
  } catch (error) {
    const message = getErrorMessage(error)
    yield put(fetchComboDishesFailure(message))
    yield put(showMessage.error(message))
  }
}

export default function* guestDishSaga() {
  yield takeLatest(fetchDishesRequest.type, handleFetchDishes)
  yield takeLatest(fetchCategoriesRequest.type, handleFetchCategories)
  yield takeEvery(fetchComboDishesRequest.type, handleFetchComboDishes)
}
