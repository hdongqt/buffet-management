import styled from 'styled-components'
import { Modal, Typography, Flex } from 'antd'
import { Space } from 'antd'

const StyledModal = {
  Wrap: styled(Modal)`
    top: 20px;

    .ant-modal-header {
      border-bottom: 1px solid #f0f0f0;
    }

    .ant-modal-body {
      padding: 24px;
    }
  `,

  Title: styled(Flex)`
    .anticon {
      color: #1890ff;
    }
  `,

  TitleText: styled(Typography.Title)`
    margin: 0;
  `,

  Content: styled(Flex)`
    gap: 24px;
  `,
}

const StyledSpace = styled(Space)`
  width: 100%;
`

const StyledStatus = {
  Container: styled.div`
    background: #f6ffed;
    border: 1px solid #b7eb8f;
    border-radius: 8px;
    padding: 16px;
    text-align: center;
  `,

  Title: styled(Typography.Text)`
    font-size: 16px;
    color: #52c41a;
    font-weight: 600;

    .anticon {
      margin-right: 8px;
    }
  `,

  TagContainer: styled.div`
    margin-top: 8px;
  `,
}

const StyledText = {
  Description: styled(Typography.Text)`
    font-size: 14px;

    .anticon {
      margin-right: 4px;
    }
  `,

  Monospace: styled(Typography.Text)`
    font-size: 14px;
    font-family: monospace;
  `,

  Strong: styled(Typography.Text)`
    font-size: 16px;
    color: #52c41a;
    font-weight: 600;

    .anticon {
      margin-right: 4px;
    }
  `,

  Block: styled(Typography.Text)`
    display: block;
    margin-top: 8px;
    font-weight: 600;
  `,
}

const Dish = {
  Container: styled.div`
    background: #fafafa;
    border: 1px solid #d9d9d9;
    border-radius: 8px;
    padding: 12px;
    max-height: 360px;
    overflow: auto;
  `,

  Price: styled(Typography.Text)`
    font-size: 14px;
    text-align: right;
    font-weight: ${(props) => (props.$strong ? 600 : 400)};
  `,

  Footer: styled.div`
    display: grid;
    grid-template-columns: 56px 1fr;
    gap: 12px;
    align-items: center;
    padding-top: 10px;
    border-top: 1px solid #f0f0f0;

    > span:first-child {
      color: #8c8c8c;
      font-size: 13px;
    }
  `,
}

export { StyledModal, StyledSpace, StyledText, StyledStatus, Dish }
