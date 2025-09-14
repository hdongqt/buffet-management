import { createSlice } from '@reduxjs/toolkit'
import { DEFAULT_PAGINATION } from '@/constants/pagination'

const initialState = {
  notifications: [],
  loading: false,
  actionLoading: false,
  error: null,
  filters: {
    type: '',
  },
}

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    fetchNotificationsRequest: (state, action) => {
      state.loading = true
      state.filters = { ...state.filters, ...action.payload.params }
    },
    fetchNotificationsSuccess: (state, action) => {
      const { notifications } = action.payload
      state.loading = false
      state.notifications = notifications
    },
    fetchNotificationsFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    },

    markAsReadRequest: (state) => {
      state.loading = true
    },
    markAsReadSuccess: (state, action) => {
      const { newNotifications } = action.payload
      state.loading = false
      state.notifications = newNotifications
    },
    markAsReadFailure: (state, action) => {
      state.actionLoading = false
      state.error = action.payload
    },

    markAllAsReadRequest: (state) => {
      state.actionLoading = true
    },
    markAllAsReadSuccess: (state, action) => {
      const { newNotifications } = action.payload
      state.loading = false
      state.notifications = newNotifications
    },
    markAllAsReadFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
  },
})

export const {
  fetchNotificationsRequest,
  fetchNotificationsSuccess,
  fetchNotificationsFailure,

  markAsReadRequest,
  markAsReadSuccess,
  markAsReadFailure,

  markAllAsReadRequest,
  markAllAsReadSuccess,
  markAllAsReadFailure,
} = notificationSlice.actions

export default notificationSlice.reducer
