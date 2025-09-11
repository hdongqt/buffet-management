import { createSlice } from '@reduxjs/toolkit'

const guestOrderSlice = createSlice({
  name: 'guestOrder',
  initialState: {
    orderId: localStorage.getItem('guestOrder'),
    order: null,
    cart: [],
    loading: false,
    actionLoading: false,
    error: null,
  },
  reducers: {
    checkTableQRRequest: (state) => {
      state.loading = true
      state.orderId = null
    },
    checkTableQRSuccess: (state, action) => {
      const { order } = action.payload
      state.loading = false
      state.orderId = order?.id
      state.error = null
      state.order = order
    },
    checkTableQRFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
      state.order = null
    },

    guestCreateOrderRequest: (state) => {
      state.actionLoading = true
    },
    guestCreateOrderSuccess: (state, action) => {
      const { order } = action.payload
      state.actionLoading = false
      state.order = order
      state.orderId = order?.id
      state.error = null
    },
    guestCreateOrderFailure: (state, action) => {
      state.actionLoading = false
      state.error = action.payload
    },

    getOrderDetailRequest: (state) => {
      state.loading = true
    },
    getOrderDetailSuccess: (state, action) => {
      const { order } = action.payload
      state.loading = false
      state.order = order
      state.error = null
    },
    getOrderDetailFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    },

    setCart: (state, action) => {
      state.cart = action.payload
    },
  },
})

export const {
  checkTableQRRequest,
  checkTableQRSuccess,
  checkTableQRFailure,

  guestCreateOrderRequest,
  guestCreateOrderSuccess,
  guestCreateOrderFailure,

  getOrderDetailRequest,
  getOrderDetailSuccess,
  getOrderDetailFailure,

  setCart,
} = guestOrderSlice.actions

export default guestOrderSlice.reducer
