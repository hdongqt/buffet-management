import * as Yup from 'yup'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useFormik } from 'formik'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import VALIDATION_MESSAGE from '@/constants/validationMessage'

import {
  checkTableQRRequest,
  guestCreateOrderRequest,
} from '@/sagas/guestOrder/guestOrderSlice'
import { fetchComboDishesRequest } from '@/sagas/guestDish/guestDishSlice'

const useGuestTableQR = () => {
  const [isAlowShowForm, setIsAlowShowForm] = useState(false)
  const navigate = useNavigate()
  const { token } = useParams()
  const [isWaitAccept, setIsWaitAccept] = useState(false)

  const formik = useFormik({
    initialValues: {
      numPeople: 1,
      comboId: null,
    },
    validationSchema: Yup.object().shape({
      numPeople: Yup.number()
        .required(VALIDATION_MESSAGE.REQUIRED('Số người'))
        .min(1, VALIDATION_MESSAGE.MIN_NUMBER('Số người', 1))
        .max(30, VALIDATION_MESSAGE.MAX_NUMBER('Số người', 30)),
      comboId: Yup.string().required('Phải chọn combo'),
    }),
    enableReinitialize: true,
    onSubmit: async ({ numPeople, comboId }) => {
      const payload = {
        token,
        numPeople,
        comboId,
      }
      await dispatch(
        guestCreateOrderRequest({
          values: payload,
          callback: () => {
            setIsWaitAccept(true)
          },
        })
      )
    },
  })

  const { loading, error, order, actionLoading } = useSelector(
    (state) => state.guestOrder
  )
  const { comboList } = useSelector((state) => state.guestDish)

  const dispatch = useDispatch()

  const callbackCheckQR = async ({ order, table }) => {
    if (table && !order) {
      setIsAlowShowForm(true)
      await dispatch(fetchComboDishesRequest())
    }
  }

  const checkExistingOrder = async () => {
    if (!token) return
    await dispatch(
      checkTableQRRequest({
        values: { token },
        callback: callbackCheckQR,
      })
    )
  }

  const handleChangeFormData = (name, value) => {
    formik.setFieldValue(name, value)
  }

  return {
    token,
    isAlowShowForm,
    formik,
    loading,
    error,
    order,
    actionLoading,
    isWaitAccept,
    comboList,
    checkExistingOrder,
    navigate,
    setIsWaitAccept,
    handleChangeFormData,
  }
}

export default useGuestTableQR
