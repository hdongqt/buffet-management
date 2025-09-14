import instance from './axios.js'

const NOTIFICATIONS_API = {
  getNotifications: async (params = {}) => {
    try {
      const res = await instance.get('/notifications', {
        params,
      })
      return res.data
    } catch (error) {
      throw error
    }
  },

  markAsRead: async (notificationId) => {
    try {
      const res = await instance.patch(`/notifications/${notificationId}/read`)
      return res.data
    } catch (error) {
      throw error
    }
  },

  markAllAsRead: async () => {
    try {
      const res = await instance.patch('/notifications/mark-all-read')
      return res.data
    } catch (error) {
      throw error
    }
  },
}

export default NOTIFICATIONS_API
