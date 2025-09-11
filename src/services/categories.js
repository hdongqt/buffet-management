import instance from './axios'

const CATEGORIES_API = {
  get: async (params) => {
    try {
      const res = await instance.get(`categories`, { params })
      return res.data
    } catch (error) {
      throw error
    }
  },
  post: async (values) => {
    try {
      const res = await instance.post(`categories`, values)
      return res.data
    } catch (error) {
      throw error
    }
  },
  put: async (id, values) => {
    try {
      const res = await instance.put(`categories/${id}`, values)
      return res.data
    } catch (error) {
      throw error
    }
  },
  delete: async (id) => {
    try {
      const res = await instance.delete(`categories/${id}`)
      return res.data
    } catch (error) {
      throw error
    }
  },
}

export default CATEGORIES_API
