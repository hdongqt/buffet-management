import { createSlice } from '@reduxjs/toolkit'
import { DEFAULT_PAGINATION } from '@/constants/pagination'

const initialState = {
  tables: [],
  loading: false,
  actionLoading: false,
  error: null,
  pagination: DEFAULT_PAGINATION,
  filters: {
    search: '',
    page: 1,
    limit: 20,
  },
}

const tableManagerSlice = createSlice({
  name: 'tableManager',
  initialState,
  reducers: {
    addTableRequest: (state) => {
      state.actionLoading = true
    },
    addTableSuccess: (state) => {
      state.actionLoading = false
      state.error = null
    },
    addTableFailure: (state, action) => {
      state.actionLoading = false
      state.error = action.payload
    },

    fetchTablesRequest: (state, action) => {
      state.loading = true
      state.filters = action.payload.params
    },
    fetchTablesSuccess: (state, action) => {
      const { pagination, tables } = action.payload
      state.loading = false
      state.pagination = pagination
      state.tables = tables
    },
    fetchTablesFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    },

    updateTableRequest: (state) => {
      state.actionLoading = true
    },
    updateTableSuccess: (state) => {
      state.actionLoading = false
      state.error = null
    },
    updateTableFailure: (state, action) => {
      state.actionLoading = false
      state.error = action.payload
    },

    updateStatusTableRequest: (state) => {
      state.actionLoading = true
    },
    updateStatusTableSuccess: (state) => {
      state.actionLoading = false
      state.error = null
    },
    updateStatusTableFailure: (state, action) => {
      state.actionLoading = false
      state.error = action.payload
    },
  },
})

export const {
  addTableRequest,
  addTableSuccess,
  addTableFailure,
  fetchTablesRequest,
  fetchTablesSuccess,
  fetchTablesFailure,
  updateTableRequest,
  updateTableSuccess,
  updateTableFailure,
  updateStatusTableRequest,
  updateStatusTableSuccess,
  updateStatusTableFailure,
} = tableManagerSlice.actions
export default tableManagerSlice.reducer
