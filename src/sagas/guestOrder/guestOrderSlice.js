import { createSlice } from '@reduxjs/toolkit'

const guestOrderSlice = createSlice({
  name: 'guestOrder',
  initialState: {
    orderId: localStorage.getItem('guestOrder'),
    order: null,
    cart: [],
    comboDish: null,
    extraDishes: [],
    totalPrice: 0,
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
      const { order, extraDishes, comboDish, totalPrice } = action.payload
      state.loading = false
      state.order = order
      state.extraDishes = extraDishes
      state.comboDish = comboDish
      state.totalPrice = totalPrice
      state.error = null
    },
    getOrderDetailFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    },

    addDishToOrderRequest: (state) => {
      state.actionLoading = true
    },
    addDishToOrderSuccess: (state) => {
      state.actionLoading = false
      state.error = null
    },
    addDishToOrderFailure: (state, action) => {
      state.actionLoading = false
      state.error = action.payload
    },

    callStaffRequest: (state) => {
      state.actionLoading = true
    },
    callStaffSuccess: (state) => {
      state.actionLoading = false
      state.error = null
    },
    callStaffFailure: (state, action) => {
      state.actionLoading = false
      state.error = action.payload
    },

    setComboDish: (state, action) => {
      const { newComboDish, newPrice } = action.payload
      state.comboDish = newComboDish
      state.totalPrice = newPrice
    },
    setExtraDishes: (state, action) => {
      const { newExtraDishes, newPrice } = action.payload
      state.extraDishes = newExtraDishes
      state.totalPrice = newPrice
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

  addDishToOrderRequest,
  addDishToOrderSuccess,
  addDishToOrderFailure,

  callStaffRequest,
  callStaffSuccess,
  callStaffFailure,

  setComboDish,
  setExtraDishes,
  setNewPrice,

  setCart,
} = guestOrderSlice.actions

export default guestOrderSlice.reducer
