import styled from 'styled-components'
import { Input, Space, Spin } from 'antd'
import { UploadOutlined } from '@ant-design/icons'

const StyledSpace = styled(Space)`
  width: 100%;
`

const EmptyState = {
  Wrap: styled.div`
    border-radius: 10px;
    width: 100%;
  `,

  Space: styled(Space)`
    padding: 12px;
  `,
}

const PreviewState = {
  Wrap: styled.div`
    position: relative;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.06), 0 1px 3px rgba(0, 0, 0, 0.1);
    aspect-ratio: 1 / 1;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  `,

  Space: styled(Space)`
    padding: 12px;
  `,

  Actions: styled.div`
    position: absolute;
    bottom: 8px;
    right: 8px;
    display: flex;
    gap: 8px;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 8px;
    padding: 6px 8px;
    backdrop-filter: blur(2px);
  `,
}

const StyledInput = styled(Input)`
  display: none;
`

const StyledUploadOutlined = styled(UploadOutlined)`
  font-size: 28px;
  color: #1677ff;
  display: block;
  margin-bottom: 8px;
`

const StyledSpin = styled(Spin)`
  min-height: 300px;
  width: 100%;
`

export {
  StyledSpace,
  PreviewState,
  EmptyState,
  StyledInput,
  StyledUploadOutlined,
  StyledSpin,
}
