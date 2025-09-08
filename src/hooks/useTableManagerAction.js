import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'

import {
  addTableRequest,
  fetchTablesRequest,
  updateTableRequest,
} from '@/sagas/tableManager/tableManagerSlice'

import VALIDATION_MESSAGE from '@/constants/validationMessage'

const useTableManagerAction = (editingTable, setIsModalOpen) => {
  const dispatch = useDispatch()
  const { actionLoading, filters } = useSelector((state) => state.tableManager)

  const formik = useFormik({
    initialValues: {
      tableNumber: editingTable?.tableNumber || 1,
      capacity: editingTable?.capacity || 1,
      ...(editingTable ? { changeQR: false } : {}),
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      tableNumber: Yup.number()
        .typeError(VALIDATION_MESSAGE.INVALID_TABLE_NUMBER)
        .required(VALIDATION_MESSAGE.INVALID_TABLE_NUMBER)
        .min(1, VALIDATION_MESSAGE.MIN_NUMBER('Số bàn', 1)),
      capacity: Yup.number()
        .typeError(VALIDATION_MESSAGE.INVALID_TABLE_CAPACITY)
        .required(VALIDATION_MESSAGE.INVALID_TABLE_CAPACITY)
        .min(1, VALIDATION_MESSAGE.MIN_NUMBER('Chỗ ngồi tối đa', 1))
        .max(30, VALIDATION_MESSAGE.MAX_NUMBER('Chỗ ngồi tối đa', 30)),
    }),
    onSubmit: async (values) => {
      if (editingTable) {
        const { tableNumber: _, ...formEditValues } = values
        await dispatch(
          updateTableRequest({
            id: editingTable.id,
            values: formEditValues,
            callback: callbackAction,
          })
        )
      } else {
        await dispatch(
          addTableRequest({
            values,
            callback: callbackAction,
          })
        )
      }
    },
  })

  const onCloseForm = () => {
    formik.resetForm()
    setIsModalOpen(false)
  }

  const callbackAction = async () => {
    onCloseForm()
    await dispatch(fetchTablesRequest({ params: filters }))
  }

  const onChangeFormValue = (name, event) => {
    formik.setFieldValue(name, event?.target?.value || event)
  }

  return {
    formik,
    actionLoading,
    onCloseForm,
    onChangeFormValue,
  }
}

export default useTableManagerAction
