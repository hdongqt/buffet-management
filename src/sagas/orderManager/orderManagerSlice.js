import { createSlice } from '@reduxjs/toolkit'

import { DEFAULT_PAGINATION } from '@/constants/pagination'

const initialState = {
  orders: [],
  order: null,
  cart: [],
  payment: null,
  loading: false,
  actionLoading: false,
  error: null,
  pagination: DEFAULT_PAGINATION,
  filters: {
    tableNumber: '',
    status: '',
    page: 1,
    limit: 20,
  },
}

const orderManagerSlice = createSlice({
  name: 'orderManager',
  initialState,
  reducers: {
    getOrderRequest: (state) => {
      state.actionLoading = true
    },
    getOrderSuccess: (state, action) => {
      state.actionLoading = false
      state.order = action.payload
      state.orders = state.orders.map((order) =>
        order.id === state.order.id ? state.order : order
      )
      state.error = null
    },
    getOrderFailure: (state, action) => {
      state.actionLoading = false
      state.error = action.payload
    },

    fetchOrdersRequest: (state, action) => {
      state.loading = true
      state.filters = action.payload.params
    },
    fetchOrdersSuccess: (state, action) => {
      state.loading = false
      state.pagination = action.payload.pagination
      state.orders = action.payload.orders
    },
    fetchOrdersFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    },

    postOrderRequest: (state) => {
      state.actionLoading = true
    },
    postOrderSuccess: (state) => {
      state.actionLoading = false
      state.error = null
    },
    postOrderFailure: (state, action) => {
      state.actionLoading = false
      state.error = action.payload
    },

    putOrderRequest: (state) => {
      state.actionLoading = true
    },
    putOrderSuccess: (state) => {
      state.actionLoading = false
      state.error = null
    },
    putOrderFailure: (state, action) => {
      state.actionLoading = false
      state.error = action.payload
    },

    postConfirmOrderRequest: (state) => {
      state.actionLoading = true
    },
    postConfirmOrderSuccess: (state) => {
      state.actionLoading = false
      state.error = null
    },
    postConfirmOrderFailure: (state, action) => {
      state.actionLoading = false
      state.error = action.payload
    },

    postCancelOrderRequest: (state) => {
      state.actionLoading = true
    },
    postCancelOrderSuccess: (state) => {
      state.actionLoading = false
      state.error = null
    },
    postCancelOrderFailure: (state, action) => {
      state.actionLoading = false
      state.error = action.payload
    },

    putStatusDishRequest: (state) => {
      state.actionLoading = true
    },
    putStatusDishSuccess: (state) => {
      state.actionLoading = false
      state.error = null
    },
    putStatusDishFailure: (state, action) => {
      state.actionLoading = false
      state.error = action.payload
    },

    postDishToOrderRequest: (state) => {
      state.actionLoading = true
    },
    postDishToOrderSuccess: (state) => {
      state.actionLoading = false
      state.error = null
    },
    postDishToOrderFailure: (state, action) => {
      state.actionLoading = false
      state.error = action.payload
    },

    getPaymentRequest: (state) => {
      state.actionLoading = true
    },
    getPaymentSuccess: (state, action) => {
      state.actionLoading = false
      state.payment = action.payload
      state.error = null
    },
    getPaymentFailure: (state, action) => {
      state.actionLoading = false
      state.error = action.payload
    },

    postPaymentRequest: (state) => {
      state.actionLoading = true
    },
    postPaymentSuccess: (state, action) => {
      state.actionLoading = false
      state.payment = action.payload
      state.error = null
    },
    postPaymentFailure: (state, action) => {
      state.actionLoading = false
      state.error = action.payload
    },

    putPaymentRequest: (state) => {
      state.actionLoading = true
    },
    putPaymentSuccess: (state, action) => {
      state.actionLoading = false
      state.payment = action.payload
      state.error = null
    },
    putPaymentFailure: (state, action) => {
      state.actionLoading = false
      state.error = action.payload
    },

    setCartOrder: (state, action) => {
      state.cart = action.payload
    },
    resetPayment: (state) => {
      state.payment = null
    },
    resetOrder: (state) => {
      state.order = null
    },
  },
})

export const {
  getOrderRequest,
  getOrderSuccess,
  getOrderFailure,
  fetchOrdersRequest,
  fetchOrdersSuccess,
  fetchOrdersFailure,
  postOrderRequest,
  postOrderSuccess,
  postOrderFailure,
  putOrderRequest,
  putOrderSuccess,
  putOrderFailure,
  postConfirmOrderRequest,
  postConfirmOrderSuccess,
  postConfirmOrderFailure,
  postCancelOrderRequest,
  postCancelOrderSuccess,
  postCancelOrderFailure,

  putStatusDishRequest,
  putStatusDishSuccess,
  putStatusDishFailure,
  postDishToOrderRequest,
  postDishToOrderSuccess,
  postDishToOrderFailure,

  getPaymentRequest,
  getPaymentSuccess,
  getPaymentFailure,
  postPaymentRequest,
  postPaymentSuccess,
  postPaymentFailure,
  putPaymentRequest,
  putPaymentSuccess,
  putPaymentFailure,

  setCartOrder,
  resetPayment,
  resetOrder,
} = orderManagerSlice.actions
export default orderManagerSlice.reducer
