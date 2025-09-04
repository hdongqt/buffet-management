import { signInRequest } from '@/sagas/users/userSlice'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import * as Yup from 'yup'

const validationSchema = Yup.object({
  username: Yup.string()
    .min(5, 'Tên đăng nhập có ít nhất 5 ký tự.')
    .required('Tên đăng nhập là bắt buộc'),
  password: Yup.string()
    .min(6, 'Mật khẩu có ít nhất 6 ký tự.')
    .required('Mật khẩu là bắt buộc'),
})

const useLogIn = () => {
  const { loading } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const initialValues = {
    username: '',
    password: '',
  }

  const onChangeFormItem = (name, event) => {
    formik.setFieldValue(name, event.target.value)
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

  return { formik, loading, onChangeFormItem }
}

export default useLogIn
