import { createSlice } from '@reduxjs/toolkit'
import { DEFAULT_PAGINATION } from '@/constants/pagination'

const initialState = {
  dishes: [],
  comboList: [],
  categories: [],
  loadingDishes: false,
  loadingCategories: false,
  actionLoading: false,
  error: null,
  pagination: { ...DEFAULT_PAGINATION, limit: -1 },
  filters: {
    search: '',
    page: 1,
    limit: -1,
  },
}

const guestDishSlice = createSlice({
  name: 'guestDish',
  initialState,
  reducers: {
    fetchDishesRequest: (state, action) => {
      state.loadingDishes = true
      state.filters = action.payload.params
    },
    fetchDishesSuccess: (state, action) => {
      const { pagination, dishes } = action.payload
      state.loadingDishes = false
      state.pagination = pagination
      state.dishes = dishes
    },
    fetchDishesFailure: (state, action) => {
      state.loadingDishes = false
      state.error = action.payload
    },

    fetchCategoriesRequest: (state) => {
      state.loadingCategories = true
    },
    fetchCategoriesSuccess: (state, action) => {
      state.loadingCategories = false
      state.categories = action.payload
    },
    fetchCategoriesFailure: (state, action) => {
      state.loadingCategories = false
      state.error = action.payload
    },

    fetchComboDishesRequest: (state) => {
      state.loadingDishes = true
    },
    fetchComboDishesSuccess: (state, action) => {
      state.loadingDishes = false
      state.comboList = action.payload
    },
    fetchComboDishesFailure: (state, action) => {
      state.loadingDishes = false
      state.error = action.payload
    },
  },
})

export const {
  fetchDishesRequest,
  fetchDishesSuccess,
  fetchDishesFailure,

  fetchCategoriesRequest,
  fetchCategoriesSuccess,
  fetchCategoriesFailure,

  fetchComboDishesRequest,
  fetchComboDishesSuccess,
  fetchComboDishesFailure,
} = guestDishSlice.actions

export default guestDishSlice.reducer
