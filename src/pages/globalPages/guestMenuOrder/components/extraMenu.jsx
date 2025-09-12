import { SearchOutlined } from '@ant-design/icons'
import { Tag } from 'antd'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import DishItem from './dishItem'
import { MenuGrid } from '../styled'
import { Input } from 'antd'

import { Spin } from 'antd'
const { Search } = Input

const CategoryWrapper = styled.div`
  display: flex;
  gap: 8px;
  overflow-x: auto;
  white-space: nowrap;
  padding-bottom: 6px;

  @media (min-width: 1024px) {
    scrollbar-width: thin;
    &::-webkit-scrollbar {
      height: 6px;
    }
    &::-webkit-scrollbar-thumb {
      background: #d9d9d9;
      border-radius: 3px;
    }
  }

  @media (max-width: 1023px) {
    -ms-overflow-style: none;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
    -webkit-overflow-scrolling: touch;
  }
`
const StyledCheckableTag = styled(Tag.CheckableTag)`
  font-size: 16px;
  font-weight: 500;
  padding: 6px 14px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background: #fafafa;
    border-color: #d9d9d9;
  }

  &.ant-tag-checkable-checked {
    background: #faad14;
    color: #fff;
    border-color: #faad14;
  }
`

const ItemPriceOld = styled.span`
  text-decoration: line-through;
  opacity: 0.5;
`

const ExtraMenu = () => {
  const { cart, order } = useSelector((state) => state.guestOrder)

  const { filters, loadingDishes, dishes, categories } = useSelector(
    (state) => state.guestDish
  )

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

  return (
    <Spin spinning={loadingDishes}>
      <Search
        placeholder='Tìm kiếm món ăn...'
        value={''}
        onChange={(e) => {}}
        prefix={<SearchOutlined />}
        allowClear
      />

      <CategoryWrapper>
        {categoriesHandler.map((cat) => (
          <StyledCheckableTag
            key={`${cat.id}-${cat.name}`}
            // checked={filters?.categoryId === cat.id}
            onChange={() => {}}
          >
            {cat.name}
          </StyledCheckableTag>
        ))}
      </CategoryWrapper>
      <MenuGrid>
        {dishesHandler &&
          dishesHandler.map((dish) => <DishItem dish={dish} key={dish.id} />)}
      </MenuGrid>
    </Spin>
  )
}

export default ExtraMenu
