import { createSlice } from '@reduxjs/toolkit'
import { DEFAULT_PAGINATION } from '@/constants/pagination'
import { menu } from 'framer-motion/client'

const initialFilter = {
  search: '',
  isCombo: null,
  sortBy: null,
  order: null,
  page: 1,
  limit: 10,
}

const initialState = {
  menuList: [],
  menu: null,
  loading: false,
  actionLoading: false,
  error: null,
  pagination: DEFAULT_PAGINATION,
  filters: initialFilter,
}

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    fetchMenuListRequest: (state) => {
      state.loading = true
      state.error = null
    },
    fetchMenuListSuccess: (state, action) => {
      state.loading = false
      state.menuList = action.payload.dishes
      state.pagination = action.payload.pagination
    },
    fetchMenuListFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    },

    getMenuRequest: (state) => {
      state.loading = true
      state.error = null
    },
    getMenuSuccess: (state, action) => {
      state.loading = false
      state.menu = action.payload
    },
    getMenuFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    },

    postMenuRequest: (state) => {
      state.actionLoading = true
    },
    postMenuSuccess: (state, action) => {
      state.actionLoading = false
      state.menuList.push(action.payload)
    },
    postMenuFailure: (state, action) => {
      state.actionLoading = false
      state.error = action.payload
    },

    putMenuRequest: (state) => {
      state.actionLoading = true
    },
    putMenuSuccess: (state) => {
      state.actionLoading = false
      state.error = null
    },
    putMenuFailure: (state, action) => {
      state.actionLoading = false
      state.error = action.payload
    },

    deleteMenuRequest: (state) => {
      state.actionLoading = true
    },
    deleteMenuSuccess: (state) => {
      state.actionLoading = false
      state.error = null
    },
    deleteMenuFailure: (state, action) => {
      state.actionLoading = false
      state.error = action.payload
    },
  },
})

export const {
  fetchMenuListRequest,
  fetchMenuListSuccess,
  fetchMenuListFailure,
  getMenuRequest,
  getMenuSuccess,
  getMenuFailure,
  postMenuRequest,
  postMenuSuccess,
  postMenuFailure,
  putMenuRequest,
  putMenuSuccess,
  putMenuFailure,
  deleteMenuRequest,
  deleteMenuSuccess,
  deleteMenuFailure,
} = menuSlice.actions

export default menuSlice.reducer
