import React, { useState } from 'react'
import styled from 'styled-components'
import { Tabs } from 'antd'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {
  fetchCategoriesRequest,
  fetchDishesRequest,
} from '@/sagas/guestDish/guestDishSlice'

import DishItem from './components/dishItem'
import ComboMenu from './components/comboMenu'
import ExtraMenu from './components/extraMenu'

const GuestMenuOrder = () => {
  const [activeScreen, setActiveScreen] = useState('combo')

  const dispatch = useDispatch()

  const { filters } = useSelector((state) => state.guestDish)

  useEffect(() => {
    dispatch(fetchDishesRequest({ params: filters }))
    dispatch(fetchCategoriesRequest())
  }, [])

  return (
    <MenuContainer>
      <Tabs
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
    </MenuContainer>
  )
}

export default GuestMenuOrder

const MenuContainer = styled.div`
  padding: 0;
`
