import axios from 'axios'

const instance = axios.create({
  baseURL: import.meta.env.VITE_API,
  headers: {
    'Content-Type': 'application/json',
  },
})

export default instance

instance.interceptors.request.use(
  (request) => {
    const accessToken = localStorage.getItem('accessToken')
    if (accessToken) {
      request.headers['Authorization'] = `Bearer ${accessToken}`
    }
    return request
  },
  (error) => {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  (response) => response, // Directly return successful responses.
  async (error) => {
    const originalRequest = error.config

    if (
      error.response.status === 404 &&
      originalRequest.url.includes('/public')
    ) {
      window.location.href = '/not-found'
      return Promise.reject(error)
    }

    if (
      error.response.status === 401 &&
      !originalRequest._retry &&
      (!originalRequest.url.includes('/login') ||
        !originalRequest.url.includes('/register'))
    ) {
      originalRequest._retry = true // Mark the request as retried to avoid infinite loops.
      try {
        const refreshToken = localStorage.getItem('refreshToken') // Retrieve the stored refresh accessToken.
        // Make a request to your auth server to refresh the accessToken.
        const response = await axios.post(
          `${import.meta.env.VITE_API}/users/refresh-token`,
          {
            refreshToken: refreshToken,
          }
        )
        const { accessToken } = response.data
        // Store the new access and refresh tokens.
        localStorage.setItem('accessToken', accessToken)
        // Update the authorization header with the new access token.
        instance.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${accessToken}`
        return instance(originalRequest) // Retry the original request with the new access token.
      } catch (refreshError) {
        // Handle refresh token errors by clearing stored tokens and redirecting to the login page.
        // console.error('accessToken refresh failed:', refreshError)
        localStorage.clear()
        window.location.href = '/login'
        return Promise.reject(refreshError)
      }
    }
    return Promise.reject(error) // For all other errors, return the error as is.
  }
)
