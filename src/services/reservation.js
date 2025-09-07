import instance from './axios'

const RESERVATION_API = {
  post: async (reservationForm) => {
    try {
      const res = await instance.post(`reservations`, reservationForm)
      return res.data
    } catch (error) {
      throw error.response?.data || error.message
    }
  },
}

export default RESERVATION_API
