import { DEFAULT_PAGINATION } from '@/constants/pagination'
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  categories: {},
  categoriesList: [],
  loading: false,
  error: null,
  pagination: DEFAULT_PAGINATION,
  filters: {
    search: '',
    page: 1,
    limit: 20,
  },
}

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    fetchCategoriesRequest: (state) => {
      state.loading = true
    },
    fetchCategoriesSuccess: (state, action) => {
      const { categoriesList, pagination } = action.payload
      state.pagination = pagination || state.pagination
      state.error = null
      state.loading = false
      state.categoriesList = categoriesList || []
    },
    fetchCategoriesFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    },

    createCategoriesRequest: (state) => {
      state.loading = true
    },
    createCategoriesSuccess: (state) => {
      state.loading = false
      state.error = null
    },
    createCategoriesFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    },

    updateCategoriesRequest: (state) => {
      state.loading = true
    },
    updateCategoriesSuccess: (state) => {
      state.loading = false
      state.error = null
    },
    updateCategoriesFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    },

    deleteCategoriesRequest: (state) => {
      state.loading = true
    },
    deleteCategoriesSuccess: (state) => {
      state.loading = false
      state.error = null
    },
    deleteCategoriesFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
  },
})

export const {
  fetchCategoriesRequest,
  fetchCategoriesSuccess,
  fetchCategoriesFailure,
  updateCategoriesRequest,
  updateCategoriesSuccess,
  updateCategoriesFailure,
  createCategoriesRequest,
  createCategoriesSuccess,
  createCategoriesFailure,
  deleteCategoriesRequest,
  deleteCategoriesSuccess,
  deleteCategoriesFailure,
} = categoriesSlice.actions

export default categoriesSlice.reducer
