import { useFormik } from 'formik'
import * as Yup from 'yup'

export const useReservationForm = () => {
  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    phone: Yup.string().required('Phone number is required'),
    date: Yup.date().required('Date is required'),
    time: Yup.string().required('Time is required'),
    guests: Yup.number()
      .min(1, 'At least 1 guest is required')
      .required('Number of guests is required'),
  })
  const initialValues = {
    name: '',
    phone: '',
    date: null,
    time: '',
    guests: 1,
  }

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnChange: false,
    validateOnBlur: true,
  })
  return { formik }
}
