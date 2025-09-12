import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  fetchCategoriesRequest,
  fetchDishesRequest,
} from '@/sagas/guestDish/guestDishSlice'

import ComboMenu from './components/comboMenu'
import ExtraMenu from './components/extraMenu'
import { GuestMenuOrderStyles } from './styled'

const GuestMenuOrder = () => {
  const [activeScreen, setActiveScreen] = useState('combo')

  const dispatch = useDispatch()

  const { filters } = useSelector((state) => state.guestDish)

  useEffect(() => {
    dispatch(fetchDishesRequest({ params: filters }))
    dispatch(fetchCategoriesRequest())
  }, [])

  return (
    <GuestMenuOrderStyles.MenuContainer>
      <GuestMenuOrderStyles.TagStyle
        activeKey={activeScreen}
        onChange={(key) => setActiveScreen(key)}
        items={[
          {
            key: 'combo',
            label: `Menu combo đã gọi`,
          },
          {
            key: 'extra',
            label: `Món gọi thêm`,
          },
        ]}
      />
      <>{activeScreen === 'combo' ? <ComboMenu /> : <ExtraMenu />}</>
    </GuestMenuOrderStyles.MenuContainer>
  )
}

export default GuestMenuOrder
