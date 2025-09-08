import { call, put, takeEvery } from 'redux-saga/effects'

import {
  fetchTablesRequest,
  fetchTablesSuccess,
  fetchTablesFailure,
  addTableSuccess,
  addTableFailure,
  addTableRequest,
  updateTableSuccess,
  updateTableFailure,
  updateTableRequest,
  updateStatusTableRequest,
  updateStatusTableSuccess,
  updateStatusTableFailure,
} from './tableManagerSlice'

import { TABLES_API } from '@/services'
import getErrorMessage from '@/utils/getMessage'
import { showMessage } from '@/sagas/appMessage/appMessageSlice'

function* handleFetchTables(action) {
  try {
    const { params } = action.payload
    const { tables, pagination } = yield call(TABLES_API.fetch, params)
    yield put(fetchTablesSuccess({ tables, pagination }))
  } catch (error) {
    const message = getErrorMessage(error)
    yield put(fetchTablesFailure(message))
    yield put(showMessage.error(message))
  }
}

function* handleAddTable(action) {
  try {
    const { values, callback } = action.payload
    const { data } = yield call(TABLES_API.add, values)
    yield put(addTableSuccess(data))
    yield put(showMessage.success('Thêm bàn thành công'))
    if (callback) {
      callback()
    }
  } catch (error) {
    const message = getErrorMessage(error)
    yield put(showMessage.error(message))
    yield put(addTableFailure(message))
  }
}

function* handleUpdateTable(action) {
  try {
    const { id, values, callback } = action.payload
    const { data } = yield call(TABLES_API.update, id, values)
    yield put(updateTableSuccess(data))
    yield put(showMessage.success('Cập nhật bàn thành công'))
    if (callback) {
      callback()
    }
  } catch (error) {
    const message = getErrorMessage(error)
    yield put(showMessage.error(message))
    yield put(updateTableFailure(message))
  }
}

function* handleUpdateStatusTable(action) {
  try {
    const { id, status, callback } = action.payload
    const { data } = yield call(TABLES_API.updateStatus, id, status)
    yield put(updateStatusTableSuccess(data))
    yield put(showMessage.success('Thay đổi trạng thái thành công'))
    if (callback) {
      callback()
    }
  } catch (error) {
    const message = getErrorMessage(error)
    yield put(showMessage.error(message))
    yield put(updateStatusTableFailure(message))
  }
}

export default function* userSaga() {
  yield takeEvery(fetchTablesRequest.type, handleFetchTables)
  yield takeEvery(addTableRequest.type, handleAddTable)
  yield takeEvery(updateTableRequest.type, handleUpdateTable)
  yield takeEvery(updateStatusTableRequest.type, handleUpdateStatusTable)
}
