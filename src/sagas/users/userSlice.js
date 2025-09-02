import { createSlice } from '@reduxjs/toolkit'

const userInit = JSON.parse(localStorage.getItem('user'))

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: userInit ?? null,
    isAuthenticated: !!userInit,
    loading: false,
    actionLoading: false,
    error: null,
  },
  reducers: {
    registerRequest: (state) => {
      state.loading = true
    },
    registerSuccess: (state) => {
      state.loading = false
      state.error = null
    },
    registerFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    },

    signInRequest: (state) => {
      state.loading = true
      state.error = null
    },
    signInSuccess: (state, action) => {
      state.loading = false
      state.user = action.payload
      state.isAuthenticated = true
      state.error = null
    },
    signInFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    },

    signOut: (state) => {
      state.user = null
      state.isAuthenticated = false
      state.error = null
      state.loading = false
    },
  },
})

export const {
  registerRequest,
  registerSuccess,
  registerFailure,
  signInRequest,
  signInSuccess,
  signInFailure,
  updateUserRequest,
  updateUserSuccess,
  updateUserFailure,
  signOut,
} = userSlice.actions
export default userSlice.reducer
