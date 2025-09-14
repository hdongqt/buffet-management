import styled from 'styled-components'
import { Modal, Typography, Flex, Alert, Space, Divider } from 'antd'

const StyledModal = {
  Wrap: styled(Modal)`
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
    margin: 0 !important;
  `,

  Content: styled(Flex)`
    gap: 16px;
  `,
}

const InfoAlert = styled(Alert)`
  border-radius: 8px;
`

const FormSpace = styled(Space)`
  width: 100%;
`

const StyledSection = {
  Container: styled.div`
    margin-bottom: 0px;
  `,

  Title: styled(Typography.Text)`
    font-size: 16px;
    color: #1890ff;
    font-weight: 600;
    margin-bottom: 12px;
    display: block;

    .anticon {
      margin-right: 8px;
    }
  `,

  Divider: styled(Divider)`
    margin: 8px 0;
  `,
}

const StyledPrice = {
  Container: styled(Flex)`
    background: #f6ffed;
    border: 1px solid #b7eb8f;
    border-radius: 8px;
    padding: 16px;
  `,

  Title: styled(Typography.Text)`
    color: #52c41a;
    font-weight: 600;

    .anticon {
      margin-right: 8px;
    }
  `,

  Content: styled.div`
    margin-top: 8px;
  `,

  Amount: styled(Typography.Text)`
    font-size: 18px;
    color: #52c41a;
    font-weight: 600;
  `,
}

export { StyledModal, InfoAlert, FormSpace, StyledSection, StyledPrice }
