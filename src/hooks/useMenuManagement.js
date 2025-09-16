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

  const commonCallback = async () => {
    if (menuList.length === 1 && pagination?.page > 1) {
      await dispatch(
        fetchMenuListRequest({
          params: { ...filters, page: pagination?.page - 1 },
        })
      )
    } else {
      await dispatch(fetchMenuListRequest({ params: { ...filters } }))
    }
  }

  const deleteMenu = async (id) => {
    await dispatch(deleteMenuRequest({ id, callback: commonCallback }))
  }

  const listCombo = menuList.map((item) => ({
    label: item.name,
    value: item.id,
    price: item.price,
  }))

  const listDish = menuList.filter((item) => !item.isCombo)

  return {
    menuList,
    listCombo,
    listDish,
    loading,
    actionLoading,
    pagination,
    filters,
    fetchMenus,
    deleteMenu,
  }
}

export default useMenuManagement
