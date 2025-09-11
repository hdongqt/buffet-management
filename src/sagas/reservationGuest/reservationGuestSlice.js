import { createSlice } from '@reduxjs/toolkit'

import { DEFAULT_PAGINATION } from '@/constants/pagination'

const reservationGuestSlice = createSlice({
  name: 'reservationGuest',
  initialState: {
    reservation: {},
    availableTables: [],
    loading: false,
    error: null,
    success: false,
    pagination: DEFAULT_PAGINATION,
  },
  reducers: {
    // ==== CREATE ====
    reservationGuestRequest: (state) => {
      state.loading = true
      state.error = null
      state.success = false
    },
    reservationGuestSuccess: (state, action) => {
      state.loading = false
      state.reservation = action.payload
      state.success = true
    },
    reservationGuestFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
      state.success = false
    },
  },
})

export const {
  reservationGuestRequest,
  reservationGuestSuccess,
  reservationGuestFailure,
} = reservationGuestSlice.actions

export default reservationGuestSlice.reducer
