import { call, put, takeLatest } from 'redux-saga/effects'
import {
  getReportRequest,
  getReportSuccess,
  getReportFailure,
} from './reportManagerSlice'
import { showMessage } from '../appMessage/appMessageSlice'
import getErrorMessage from '@/utils/getMessage'
import REPORT_API from '@/services/report'

function* handleGetReportManager(action) {
  try {
    const { params, callback } = action.payload
    const { startDate, endDate } = params
    const { reports } = yield call(REPORT_API.get, {
      startDate,
      endDate,
    })

    yield put(getReportSuccess(reports))
    if (typeof callback === 'function') {
      yield call(callback)
    }
  } catch (error) {
    const errorMessage = getErrorMessage(error)
    yield put(getReportFailure(errorMessage))
    yield put(showMessage.error(errorMessage))
  }
}

export default function* reportManagerSaga() {
  yield takeLatest(getReportRequest.type, handleGetReportManager)
}
