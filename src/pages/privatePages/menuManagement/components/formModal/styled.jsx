import styled from 'styled-components'
import { InputNumber } from 'antd'
import { CustomModal } from '@/components/common/ui'

const StyledModal = {
  Wrap: styled(CustomModal)`
    top: 20px;
  `,

  Grid: styled.div`
    display: grid;
    grid-template-columns: 340px 1fr;
    gap: 16px;
    align-items: start;

    @media (max-width: 992px) {
      grid-template-columns: 1fr;
    }
  `,
}

const ImagePanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-height: calc(100vh - 200px);
  padding-right: 4px;
`

const FormPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const Section = styled.section`
  background: #fff;
  border: 1px solid #f0f0f0;
  border-radius: 12px;
  padding: 14px 16px;
  box-shadow: 0 2px 6px -2px rgba(0, 0, 0, 0.05),
    0 4px 12px -6px rgba(0, 0, 0, 0.06);
`

const SectionHeader = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 10px;

  h5 {
    margin: 0;
    font-size: 16px;
    font-weight: 600;
  }

  p {
    margin: 0;
    color: #8c8c8c;
    font-size: 12px;
  }
`

const FieldGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const SelectedList = styled.div`
  position: sticky;
  top: 0;
  overflow: auto;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  max-height: 150px;
  overflow: auto;
  padding: 6px 4px;
  background: #fafafa;
  border: 1px dashed #e5e5e5;
  border-radius: 8px;
  overflow-y: auto;
`

const StyledInputNumber = styled(InputNumber)`
  width: 100%;
`

export {
  StyledModal,
  ImagePanel,
  FormPanel,
  Section,
  SectionHeader,
  FieldGrid,
  SelectedList,
  StyledInputNumber,
}
