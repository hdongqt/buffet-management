import { useState, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getOrderRequest,
  putStatusDishRequest,
} from '@/sagas/orderManager/orderManagerSlice'

const useOrderDishes = () => {
  const dispatch = useDispatch()
  const { order } = useSelector((state) => state.orderManager)

  const [searchValue, setSearchValue] = useState('')
  const [filterStatus, setFilterStatus] = useState()
  const [addModalOpen, setAddModalOpen] = useState(false)

  const dataFiltered = useMemo(() => {
    return (
      order?.normalDishes
        ?.filter((d) =>
          d.name.toLowerCase().includes(searchValue.toLowerCase())
        )
        ?.filter((d) => (filterStatus ? d.status === filterStatus : true)) || []
    )
  }, [order, searchValue, filterStatus])

  const updateRowStatus = async (id, status) => {
    await dispatch(
      putStatusDishRequest({
        orderId: order?.id,
        snapshotId: id,
        values: { status },
        callback: async () => {
          await dispatch(getOrderRequest({ id: order?.id }))
        },
      })
    )
  }

  const openAddModal = () => setAddModalOpen(true)
  const closeAddModal = () => setAddModalOpen(false)

  return {
    searchValue,
    setSearchValue,
    filterStatus,
    setFilterStatus,
    addModalOpen,
    openAddModal,
    closeAddModal,
    dataFiltered,
    updateRowStatus,
  }
}
export default useOrderDishes
