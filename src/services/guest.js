import instance from './axios'

const RESERVATION_GUEST_API = {
  post: async (reservationForm) => {
    try {
      const res = await instance.post(`guest/reservations`, reservationForm)
      return res.data
    } catch (error) {
      throw error
    }
  },
}

export default RESERVATION_GUEST_API
