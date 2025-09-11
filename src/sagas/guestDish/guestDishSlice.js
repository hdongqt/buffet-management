import { createSlice } from '@reduxjs/toolkit'
import { DEFAULT_PAGINATION } from '@/constants/pagination'

const initialState = {
  dishes: [],
  categories: [],
  loadingDishes: false,
  loadingCategories: false,
  actionLoading: false,
  error: null,
  pagination: DEFAULT_PAGINATION,
  filters: {
    search: '',
    page: 1,
    limit: 20,
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
  },
})

export const {
  fetchDishesRequest,
  fetchDishesSuccess,
  fetchDishesFailure,
  fetchCategoriesRequest,
  fetchCategoriesSuccess,
  fetchCategoriesFailure,
} = guestDishSlice.actions

export default guestDishSlice.reducer
