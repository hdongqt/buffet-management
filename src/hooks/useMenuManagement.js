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
    await dispatch(deleteMenuRequest({ id }))
  }

  return {
    menuList,
    loading,
    actionLoading,
    pagination,
    filters,
    fetchMenus,
    deleteMenu,
  }
}

export default useMenuManagement
