import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects'
import {
  fetchNotificationsRequest,
  fetchNotificationsSuccess,
  fetchNotificationsFailure,
  markAsReadRequest,
  markAsReadSuccess,
  markAsReadFailure,
  markAllAsReadRequest,
  markAllAsReadSuccess,
  markAllAsReadFailure,
} from './notificationSlice'

import { NOTIFICATIONS_API } from '@/services'
import { showMessage } from '@/sagas/appMessage/appMessageSlice'
import getErrorMessage from '@/utils/getMessage'

function* handleFetchNotifications(action) {
  try {
    const { params } = action.payload
    const { notifications } = yield call(
      NOTIFICATIONS_API.getNotifications,
      params
    )
    yield put(fetchNotificationsSuccess({ notifications }))
  } catch (error) {
    const message = getErrorMessage(error)
    yield put(fetchNotificationsFailure(message))
    yield put(showMessage.error(message))
  }
}

function* handleMarkAsRead(action) {
  try {
    const { notificationId } = action.payload
    yield call(NOTIFICATIONS_API.markAsRead, notificationId)

    const current = yield select((state) => state.notifications)
    const newNotifications = current.notifications.map((notification) =>
      notification.id === notificationId
        ? { ...notification, isRead: true }
        : notification
    )

    yield put(markAsReadSuccess({ newNotifications }))
  } catch (error) {
    const message = getErrorMessage(error)
    yield put(markAsReadFailure(message))
    yield put(showMessage.error(message))
  }
}

function* handleMarkAllAsRead() {
  try {
    yield call(NOTIFICATIONS_API.markAllAsRead)
    yield put(showMessage.success('Đã đánh dấu tất cả thông báo là đã đọc'))

    const current = yield select((state) => state.notifications)
    const newNotifications = current.notifications.map((notification) => ({
      ...notification,
      isRead: true,
    }))

    yield put(markAllAsReadSuccess({ newNotifications }))
  } catch (error) {
    const message = getErrorMessage(error)
    yield put(markAllAsReadFailure(message))
    yield put(showMessage.error(message))
  }
}

export default function* notificationSaga() {
  yield takeLatest(fetchNotificationsRequest.type, handleFetchNotifications)
  yield takeEvery(markAsReadRequest.type, handleMarkAsRead)
  yield takeEvery(markAllAsReadRequest.type, handleMarkAllAsRead)
}
