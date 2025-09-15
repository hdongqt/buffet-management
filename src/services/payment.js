import instance from '@/services/axios'

const PAYMENT_API = {
  get: async (id) => {
    try {
      const res = await instance.get(`/payment/order/${id}`)
      return res.data
    } catch (error) {
      throw error
    }
  },

  post: async (id, data) => {
    try {
      const res = await instance.post(`/payment/${id}`, data)
      return res.data
    } catch (error) {
      throw error
    }
  },

  put: async (id) => {
    try {
      const res = await instance.put(`/payment/${id}/confirm`)
      return res.data
    } catch (error) {
      throw error
    }
  },
}

export default PAYMENT_API
