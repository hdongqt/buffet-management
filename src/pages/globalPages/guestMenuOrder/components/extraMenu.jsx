import { Spin } from 'antd'
import { SearchOutlined } from '@ant-design/icons'

import DishItem from './dishItem'
import { CommonUI } from '@/components/common'

import { ExtraMenuStyles, MenuGrid } from '../styled'
import useGuestExtraMenu from '@/hooks/useGuestExtraMenu'

const { CustomInput } = CommonUI

const ExtraMenu = () => {
  const {
    filters,
    handleChangeSearch,
    handleSelectCategory,
    loadingDishes,
    dishesHandler,
    categoriesHandler,
  } = useGuestExtraMenu()

  return (
    <Spin spinning={loadingDishes}>
      <ExtraMenuStyles.Controls>
        <CustomInput
          placeholder='Tìm kiếm món ăn...'
          defaultValue={filters?.search || ''}
          onChange={handleChangeSearch}
          prefix={<SearchOutlined />}
          allowClear
        />

        <ExtraMenuStyles.CategoryWrapper>
          {categoriesHandler.map((cat) => (
            <ExtraMenuStyles.StyledCheckableTag
              key={`${cat.id}-${cat.name}`}
              checked={(filters?.categoryId ?? '') === (cat.id ?? '')}
              onChange={() => handleSelectCategory(cat.id)}
            >
              {cat.name}
            </ExtraMenuStyles.StyledCheckableTag>
          ))}
        </ExtraMenuStyles.CategoryWrapper>
      </ExtraMenuStyles.Controls>

      <MenuGrid>
        {dishesHandler &&
          dishesHandler.map((dish) => <DishItem dish={dish} key={dish.id} />)}
      </MenuGrid>
    </Spin>
  )
}

export default ExtraMenu
