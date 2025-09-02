import instance from '@/services/axios'

const AUTH_API = {
  postLogin: async (data) => {
    try {
      const res = await instance.post('/auth/login', data)

      return res.data
    } catch (error) {
      throw error
    }
  },

  post: async (data) => {
    try {
      const res = await instance.post('/auth/refresh-token', {
        refreshToken: data,
      })

      const { accessToken, message } = res.data
      return { accessToken, message }
    } catch (error) {
      throw error
    }
  },
}

export default AUTH_API
