import styled from 'styled-components'
import { Row, Tag, Typography } from 'antd'

import { CustomInput } from '@/components/common/ui'

const StyledRow = styled(Row)`
  margin-bottom: 16px;
`

const FiltersRow = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;

  .ant-form-item {
    margin-bottom: 0;
  }
`

const StyledTag = styled(Tag)`
  text-transform: capitalize;
`

const StyledText = styled(Typography.Text)`
  max-width: 100%;
  display: inline-block;
`

const FilterInput = styled(CustomInput)`
  .ant-select-selector {
    width: 280px;
  }
`

export { StyledRow, FiltersRow, StyledTag, StyledText, FilterInput }
