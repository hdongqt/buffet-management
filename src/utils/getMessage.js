const getErrorMessage = (error, fallback = 'Something went wrong') => {
  return error?.response?.data?.error || error?.message || fallback
}
export default getErrorMessage
