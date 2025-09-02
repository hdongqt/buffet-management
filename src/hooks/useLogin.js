import { signInRequest } from '@/sagas/users/userSlice'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import * as Yup from 'yup'

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .min(6, 'Password needs to be at least 6 characters.')
    .required('Password is required'),
})

const useLogIn = () => {
  const { loading } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const initialValues = {
    email: '',
    password: '',
  }

  const onSubmit = (data) => {
    dispatch(
      signInRequest({
        values: data,
        callback: (url) => {
          navigate(url)
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

export default useLogIn
