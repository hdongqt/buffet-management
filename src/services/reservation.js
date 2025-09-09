import instance from './axios'

const RESERVATION_API = {
  post: async (reservationForm) => {
    try {
      const res = await instance.post(`reservations`, reservationForm)
      return res.data
    } catch (error) {
      throw error
    }
  },
  get: async (params) => {
    try {
      const res = await instance.get(`reservations`, { params })
      return res.data
    } catch (error) {
      throw error
    }
  },
  put: async (id, values) => {
    try {
      const res = await instance.put(`reservations/${id}`, values)
      return res.data
    } catch (error) {
      throw error
    }
  },
  getTableAvailable: async (dateBooking, timeBooking, numPeople) => {
    try {
      const res = await instance.get(`reservations/table-available`, {
        params: { dateBooking, timeBooking, numPeople },
      })
      return res.data
    } catch (error) {
      throw error
    }
  },
}

export default RESERVATION_API
