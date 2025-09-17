import { useDispatch, useSelector } from 'react-redux'

import {
  fetchMenuListRequest,
  deleteMenuRequest,
  fetchDishListRequest,
} from '@/sagas/menuManagement/menuSlice'

const useMenuManagement = () => {
  const dispatch = useDispatch()

  const {
    menuList,
    dishList,
    loading,
    actionLoading,
    pagination,
    paginationDish,
    filters,
  } = useSelector((state) => state.menu)

  const fetchMenus = async (params) =>
    await dispatch(fetchMenuListRequest({ params }))

  const fetchDishes = async (params) =>
    await dispatch(
      fetchDishListRequest({
        params: params ? { ...params } : { page: 1, limit: -1, isCombo: false },
      })
    )

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

  return {
    menuList,
    listCombo,
    dishList,
    loading,
    actionLoading,
    pagination,
    paginationDish,
    filters,
    fetchMenus,
    fetchDishes,
    deleteMenu,
  }
}

export default useMenuManagement
