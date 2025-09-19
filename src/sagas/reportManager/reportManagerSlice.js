import { createSlice } from '@reduxjs/toolkit'

const reportManagerSlice = createSlice({
  name: 'reportManager',
  initialState: {
    loading: false,
    error: null,
    reports: null,
    filters: {
      startDate: null,
      endDate: null,
      filterBy: 'thisMonth',
    },
  },
  reducers: {
    getReportRequest: (state, action) => {
      state.loading = true
      state.error = null
      state.filters = action.payload.params
    },
    getReportSuccess: (state, action) => {
      state.loading = false
      state.error = null
      state.reports = action.payload
    },
    getReportFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
  },
})

export const { getReportRequest, getReportSuccess, getReportFailure } =
  reportManagerSlice.actions

export default reportManagerSlice.reducer
