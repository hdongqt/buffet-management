import { createSlice } from '@reduxjs/toolkit'

import { DEFAULT_PAGINATION } from '@/constants/pagination'

const reservationSlice = createSlice({
  name: 'reservation',
  initialState: {
    reservation: {},
    reservationList: [],
    availableTables: [],
    loading: false,
    error: null,
    success: false,
    pagination: DEFAULT_PAGINATION,
    filters: {
      status: '',
      search: '',
      reservedAt: null,
      page: 1,
      limit: 20,
    },
  },
  reducers: {
    // ==== CREATE ====
    reservationRequest: (state) => {
      state.loading = true
      state.error = null
      state.success = false
    },
    reservationSuccess: (state, action) => {
      state.loading = false
      state.reservation = action.payload
      state.success = true
    },
    reservationFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
      state.success = false
    },

    // ==== GET LIST ====
    getReservationRequest: (state, action) => {
      state.loading = true
      state.error = null
      state.success = false
      state.filters = action.payload.params
    },
    getReservationSuccess: (state, action) => {
      const { reservationList, pagination } = action.payload
      state.loading = false
      state.reservationList = reservationList || []
      state.success = true
      state.pagination = pagination || state.pagination
    },
    getReservationFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
      state.success = false
    },

    // ==== UPDATE ====
    updateReservationRequest: (state) => {
      state.loading = true
      state.error = null
    },
    updateReservationSuccess: (state) => {
      state.loading = false
    },
    updateReservationFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    },

    // ==== GET TABLE AVAILABLE ====
    getTableAvailableRequest: (state) => {
      state.loading = true
      state.error = null
      state.success = false
    },
    getTableAvailableSuccess: (state, action) => {
      state.loading = false
      state.success = true
      state.availableTables = action.payload || []
    },
    getTableAvailableFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
      state.success = false
    },
  },
})

export const {
  reservationRequest,
  reservationSuccess,
  reservationFailure,
  getReservationRequest,
  getReservationSuccess,
  getReservationFailure,
  resetCreateSuccess,
  updateReservationRequest,
  updateReservationSuccess,
  updateReservationFailure,
  resetUpdateSuccess,
  getTableAvailableRequest,
  getTableAvailableSuccess,
  getTableAvailableFailure,
} = reservationSlice.actions

export default reservationSlice.reducer
