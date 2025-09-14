import instance from '@/services/axios'

const ORDER_API = {
  fetch: async (params = {}) => {
    try {
      const res = await instance.get('/orders', { params })

      return res.data
    } catch (error) {
      throw error
    }
  },

  get: async (id) => {
    try {
      const res = await instance.get(`/orders/${id}`)

      return res.data
    } catch (error) {
      throw error
    }
  },

  post: async (values) => {
    try {
      const res = await instance.post('/orders', values)

      return res.data
    } catch (error) {
      throw error
    }
  },

  put: async (id, values) => {
    try {
      const res = await instance.put(`/orders/${id}`, values)

      return res.data
    } catch (error) {
      throw error
    }
  },

  postConfirm: async (id) => {
    try {
      const res = await instance.post(`/orders/${id}/confirm`)

      return res.data
    } catch (error) {
      throw error
    }
  },

  postCancel: async (id) => {
    try {
      const res = await instance.post(`/orders/${id}/cancel`)

      return res.data
    } catch (error) {
      throw error
    }
  },

  putStatusDish: async (orderId, snapshotId, values) => {
    try {
      const res = await instance.put(
        `/orders/${orderId}/dish-snapshots/${snapshotId}/status`,
        values
      )

      return res.data
    } catch (error) {
      throw error
    }
  },

  postDish: async (data) => {
    try {
      const { orderId, dishes } = data
      const res = await instance.post(`/guest/${orderId}/add-dish`, { dishes })
      return res.data
    } catch (error) {
      throw error
    }
  },
}

export default ORDER_API
