import instance from './axios'

const REPORT_API = {
  get: async (params) => {
    try {
      const res = await instance.get(`reports/revenue`, { params })
      return res.data
    } catch (error) {
      throw error
    }
  },
}

export default REPORT_API
