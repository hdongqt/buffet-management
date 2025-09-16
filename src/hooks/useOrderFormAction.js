import { useEffect, useMemo, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import dayjs from 'dayjs'

import VALIDATION_MESSAGE from '@/constants/validationMessage'
import DATE_FORMAT from '@/constants/dateTimeFormat'

import {
  fetchOrdersRequest,
  postOrderRequest,
  putOrderRequest,
} from '@/sagas/orderManager/orderManagerSlice'
import { getTableAvailableRequest } from '@/sagas/reservation/reservationSlice'
import useMenuManagement from '@/hooks/useMenuManagement'

const useOrderFormAction = ({ initialValues, onClose }) => {
  const dispatch = useDispatch()
  const { availableTables, loading } = useSelector((state) => state.reservation)
  const { filters } = useSelector((state) => state.orderManager)
  const { listCombo } = useMenuManagement()

  const validationSchema = useMemo(() => {
    let maxNum = 30

    // if (initialValues?.table?.capacity) {
    //   maxNum = initialValues.table.capacity + 2
    // }

    return Yup.object({
      tableId: Yup.object({
        value: Yup.string().required(),
        label: Yup.string().required(),
      }).required(VALIDATION_MESSAGE.REQUIRED('Số bàn')),
      numPeople: Yup.number()
        .required(VALIDATION_MESSAGE.REQUIRED('Số người'))
        .min(1, VALIDATION_MESSAGE.MIN_NUMBER('Số người', 1))
        .max(maxNum, VALIDATION_MESSAGE.MAX_NUMBER('Số người', maxNum)),
      comboId: Yup.object({
        value: Yup.string().required(),
        label: Yup.string().required(),
      }).required(VALIDATION_MESSAGE.REQUIRED('Loại combo')),
    })
  }, [initialValues])

  const defaultValues = useMemo(
    () => ({
      tableId: initialValues?.table
        ? {
            value: initialValues.table.id,
            label: `Bàn ${initialValues.table.tableNumber} - ${initialValues.table.capacity} chỗ`,
          }
        : null,
      numPeople: initialValues?.numPeople || 1,
      comboId: initialValues?.combo
        ? { value: initialValues.combo.dishId, label: initialValues.combo.name }
        : null,
    }),
    [initialValues]
  )

  console.log('defaultValues', defaultValues)
  console.log('initialValues', initialValues)

  const handleGetTableAvailable = (numPeople) => {
    if (numPeople) {
      dispatch(
        getTableAvailableRequest({
          dateBooking: dayjs().format(DATE_FORMAT.FULL_DATE),
          timeBooking: dayjs().format(DATE_FORMAT.TIME),
          numPeople: numPeople,
        })
      )
    }
  }

  const addCallback = async () => {
    await dispatch(fetchOrdersRequest({ params: { ...filters, page: 1 } }))
    formik.resetForm()
    onClose()
  }

  const updateCallback = async () => {
    await dispatch(fetchOrdersRequest({ params: { ...filters } }))
    onClose()
  }

  const handleSubmit = async (values) => {
    const payload = {
      tableId: values.tableId.value,
      numPeople: values.numPeople,
      comboId: values.comboId?.value,
    }

    console.log('payload', payload)
    if (initialValues?.id) {
      delete payload.tableId
      await dispatch(
        putOrderRequest({
          id: initialValues.id,
          values: payload,
          callback: updateCallback,
        })
      )
    } else {
      await dispatch(
        postOrderRequest({ values: payload, callback: addCallback })
      )
    }
  }

  const formik = useFormik({
    initialValues: defaultValues,
    validationSchema,
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit: handleSubmit,
    enableReinitialize: true,
  })

  const onChangeFormItem = useCallback(
    (field, value) => {
      formik.setFieldValue(field, value)

      if (!initialValues && field === 'numPeople') {
        handleGetTableAvailable(value)
      }
    },
    [formik, handleGetTableAvailable]
  )

  const listOptionTable = useMemo(
    () =>
      availableTables.map((table) => ({
        key: table.id,
        value: table.id,
        label: `Bàn ${table.tableNumber} - ${table.capacity} chỗ`,
      })),
    [availableTables]
  )

  const selectedCombo = useMemo(() => {
    return listCombo.find((c) => c.value === formik.values.comboId?.value)
  }, [listCombo, formik.values.comboId?.value])

  const totalPrice = useMemo(() => {
    return selectedCombo
      ? selectedCombo.price * (formik.values.numPeople || 0)
      : 0
  }, [selectedCombo, formik.values.numPeople])

  return {
    formik,
    listOptionTable,
    listCombo,
    selectedCombo,
    totalPrice,
    loading,
    onChangeFormItem,
  }
}

export default useOrderFormAction
