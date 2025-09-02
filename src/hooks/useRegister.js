import { registerRequest } from '@/sagas/users/userSlice'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import * as Yup from 'yup'
import { App } from 'antd'

const validationSchema = Yup.object({
  fullname: Yup.string().trim().required('Full Name is required'),
  email: Yup.string()
    .trim()
    .email('Invalid email')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password needs to be at least 6 characters.')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm Password is required'),
})

const useRegister = () => {
  const { loading } = useSelector((state) => state.user)
  const { message } = App.useApp()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const initialValues = {
    fullname: '',
    email: '',
    password: '',
    confirmPassword: '',
  }

  const onSubmit = (data) => {
    dispatch(
      registerRequest({
        values: data,
        callback: ({ success, messageResponse }) => {
          if (success) {
            message.success(messageResponse)
            navigate('/login')
          } else {
            message.error(messageResponse)
          }
        },
      })
    )
  }

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit,
  })

  return { formik, loading }
}

export default useRegister
