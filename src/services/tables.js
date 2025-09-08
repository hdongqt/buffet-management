import instance from './axios'

const TABLES_API = {
  fetch: async (params) => {
    try {
      const res = await instance.get(`/tables`, {
        params,
      })
      return res.data
    } catch (error) {
      throw error
    }
  },

  add: async (data) => {
    try {
      const res = await instance.post('/tables', data)
      return res.data
    } catch (error) {
      throw error
    }
  },

  update: async (id, data) => {
    try {
      const res = await instance.put(`/tables/${id}`, data)
      return res.data
    } catch (error) {
      throw error
    }
  },

  updateStatus: async (id, status) => {
    try {
      const res = await instance.patch(`/tables/${id}/status`, {
        status,
      })
      return res.data
    } catch (error) {
      throw error
    }
  },
}

export default TABLES_API
