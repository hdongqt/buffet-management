import { createSlice } from '@reduxjs/toolkit'

const reservationSlice = createSlice({
  name: 'reservation',
  initialState: {
    reservation: {},
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
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
  },
})

export const { reservationRequest, reservationSuccess, reservationFailure } =
  reservationSlice.actions

export default reservationSlice.reducer
