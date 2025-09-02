import instance from './axios'

const USERS_API = {
  put: async (user) => {
    try {
      const res = await instance.put(`/users/update-myself`, user)

      return res.data
    } catch (error) {
      throw error.message
    }
  },
}

export default USERS_API
