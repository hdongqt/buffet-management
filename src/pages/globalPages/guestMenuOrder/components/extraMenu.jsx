import { Spin, Flex, Empty } from 'antd'
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

      {dishesHandler?.length ? (
        <MenuGrid>
          {dishesHandler.map((dish) => (
            <DishItem dish={dish} key={dish.id} />
          ))}
        </MenuGrid>
      ) : (
        <Flex align='center' justify='center'>
          <Empty description='Hiện tại hết món cho loại này' />
        </Flex>
      )}
    </Spin>
  )
}

export default ExtraMenu
