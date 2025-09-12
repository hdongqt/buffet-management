import { useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { fetchDishesRequest } from '@/sagas/guestDish/guestDishSlice'

import useDebounceCallback from '@/hooks/useDebounceCallback'

const useGuestExtraMenu = () => {
  const dispatch = useDispatch()
  const { cart, order } = useSelector((state) => state.guestOrder)
  const { filters, loadingDishes, dishes, categories } = useSelector(
    (state) => state.guestDish
  )

  const debouncedSearch = useDebounceCallback((value) => {
    dispatch(
      fetchDishesRequest({
        params: {
          ...filters,
          search: value || undefined,
          page: 1,
        },
      })
    )
  }, 500)

  const handleChangeSearch = (e) => {
    debouncedSearch(e?.target?.value)
  }

  const handleSelectCategory = (categoryId) => {
    dispatch(
      fetchDishesRequest({
        params: {
          ...filters,
          categoryId: categoryId || undefined,
          page: 1,
        },
      })
    )
  }

  const dishesHandler = useMemo(() => {
    const listComboDish = order?.combo?.listDish || []

    const filterDishes = dishes.filter(
      (item) => !listComboDish.find((comboItem) => comboItem.id === item.id)
    )

    return filterDishes.map((item) => {
      const cartItem = cart.find((cartItem) => cartItem.id === item.id)
      const quantity = cartItem ? cartItem.quantity : 0

      return {
        ...item,
        quantity,
      }
    })
  }, [order?.combo?.listDish, dishes, cart])

  const categoriesHandler = [
    {
      id: '',
      name: 'Tất cả',
    },
    ...categories,
    {
      id: null,
      name: 'Khác',
    },
  ]

  return {
    filters,
    handleChangeSearch,
    handleSelectCategory,
    loadingDishes,
    dishesHandler,
    categoriesHandler,
  }
}

export default useGuestExtraMenu
