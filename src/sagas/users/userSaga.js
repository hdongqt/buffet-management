import { call, put, takeLatest } from 'redux-saga/effects'

import { signInSuccess, signInFailure, signInRequest } from './userSlice'

import { AUTH_API } from '@/services/index'
import getErrorMessage from '@/utils/getMessage'
import ROLES from '@/constants/roles'
import { ADMIN_ROUTES, MANAGER_ROUTES } from '@/constants/listRoutes'
import { showMessage } from '../appMessage/appMessageSlice'

function* handleSignIn(action) {
  const { values, callback } = action.payload
  try {
    const data = yield call(AUTH_API.postLogin, values)
    localStorage.setItem('user', JSON.stringify(data.user))
    localStorage.setItem('accessToken', data.accessToken)
    localStorage.setItem('refreshToken', data.refreshToken)
    yield put(signInSuccess(data.user))
    if (callback) {
      const role = data.user?.role ?? null
      const urlRedirect =
        role === ROLES.ADMIN ? ADMIN_ROUTES.ROOT : MANAGER_ROUTES.ROOT
      callback(urlRedirect)
    }
  } catch (error) {
    const errorMessage = getErrorMessage(error, 'Login failed')
    yield put(signInFailure(errorMessage))
    yield put(showMessage.error(errorMessage))
  }
}

export default function* userSaga() {
  yield takeLatest(signInRequest.type, handleSignIn)
}
