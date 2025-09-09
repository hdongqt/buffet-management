import instance from '@/services/axios'

const UPLOAD_IMAGE_API = {
  post: async (imageFile) => {
    const formData = new FormData()
    formData.append('file', imageFile)

    const res = await instance.post('/upload/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return res.data
  },
}

export { UPLOAD_IMAGE_API }
