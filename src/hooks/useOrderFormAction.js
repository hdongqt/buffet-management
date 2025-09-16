import { useMemo, useCallback } from 'react'
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

import { getCapacity } from '@/utils/getCapacity'

const useOrderFormAction = ({ initialValues, onClose }) => {
  const dispatch = useDispatch()
  const { availableTables, loading } = useSelector((state) => state.reservation)
  const { filters } = useSelector((state) => state.orderManager)
  const { listCombo } = useMenuManagement()

  const validationSchema = useMemo(() => {
    let maxNum = 30

    if (initialValues) {
      const capacity = initialValues.table?.capacity
      if (capacity) {
        maxNum = getCapacity(capacity)
      }
    }

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

      const selectedTable = availableTables.find(
        (t) =>
          t.id ===
          (field === 'tableId' ? value?.value : formik.values.tableId?.value)
      )

      if (
        !initialValues &&
        selectedTable &&
        (field === 'numPeople' ? value : formik.values.numPeople) >
          getCapacity(selectedTable?.capacity)
      ) {
        formik.setFieldValue('tableId', null)
      }

      if (
        (!initialValues &&
          field === 'numPeople' &&
          value > getCapacity(selectedTable?.capacity)) ||
        value < getCapacity(selectedTable?.capacity)
      ) {
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
