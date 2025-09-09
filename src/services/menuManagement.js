import instance from './axios.js'

const MENUS_API = {
  getList: async (params = {}) => {
    try {
      const res = await instance.get('/dishes', { params })

      return res.data
    } catch (error) {
      throw error
    }
  },

  getById: async (id) => {
    try {
      const res = await instance.get(`/dishes/${id}`)

      return res.data
    } catch (error) {
      throw error
    }
  },

  post: async (data) => {
    try {
      const res = await instance.post('/dishes', data)

      return res.data
    } catch (error) {
      throw error
    }
  },

  put: async (values) => {
    try {
      const res = await instance.put(`/dishes/${values.id}`, values)

      return res.data
    } catch (error) {
      throw error
    }
  },

  delete: async (id) => {
    try {
      const res = await instance.delete(`/dishes/${id}`)

      return res.data
    } catch (error) {
      throw error
    }
  },
}

export default MENUS_API
