import instance from './axios.js'

const GUESTS_API = {
  checkQRTable: async (params = {}) => {
    try {
      const res = await instance.get('/guest/check-qr', { params })
      return res.data
    } catch (error) {
      throw error
    }
  },

  createOrder: async (params = {}) => {
    try {
      const res = await instance.post('/guest/create-order', params)
      return res.data
    } catch (error) {
      throw error
    }
  },

  getListDish: async (params = {}) => {
    try {
      const res = await instance.get('/guest/dishes', { params })
      return res.data
    } catch (error) {
      throw error
    }
  },

  getCategories: async (params) => {
    try {
      const res = await instance.get('/categories', { params })
      return res.data
    } catch (error) {
      throw error
    }
  },

  getOrderDetail: async (id) => {
    try {
      const res = await instance.get(`/guest/orders/${id}`)
      return res.data
    } catch (error) {
      throw error
    }
  },

  getComboList: async (params = {}) => {
    try {
      const res = await instance.get('/dishes', { params })
      return res.data
    } catch (error) {
      throw error
    }
  },

  addDish: async (data) => {
    try {
      const { orderId, dishes } = data
      const res = await instance.post(`/guest/${orderId}/add-dish`, { dishes })
      return res.data
    } catch (error) {
      throw error
    }
  },

  callStaff: async (data) => {
    try {
      const { orderId, note } = data
      const res = await instance.post(`/guest/call-staff`, { orderId, note })
      return res.data
    } catch (error) {
      throw error
    }
  },
}

export default GUESTS_API
