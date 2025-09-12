import { useDispatch, useSelector } from 'react-redux'

import {
  fetchMenuListRequest,
  deleteMenuRequest,
} from '@/sagas/menuManagement/menuSlice'

const useMenuManagement = () => {
  const dispatch = useDispatch()

  const { menuList, loading, actionLoading, pagination, filters } = useSelector(
    (state) => state.menu
  )

  const fetchMenus = async (params) =>
    await dispatch(fetchMenuListRequest({ params }))

  const deleteMenu = async (id) => {
    await dispatch(deleteMenuRequest({ id, callback: commonCallback }))
  }

  const commonCallback = async () => {
    await dispatch(fetchMenuListRequest({ params: {} }))
  }

  const listCombo = menuList
    .filter((item) => item.isCombo)
    .map((item) => ({
      label: item.name,
      value: item.id,
      price: item.price,
    }))

  return {
    menuList,
    listCombo,
    loading,
    actionLoading,
    pagination,
    filters,
    fetchMenus,
    deleteMenu,
  }
}

export default useMenuManagement
