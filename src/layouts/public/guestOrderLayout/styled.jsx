import { Menu } from 'antd'
import { Layout } from 'antd'
import styled from 'styled-components'

const GuestOrderLayoutWrapper = {
  Layout: styled(Layout)`
    min-height: 100vh;

    .ant-layout-header {
      background: #3a3a3b;
      position: fixed;
      top: 0;
      width: 100%;
      z-index: 1000;
    }

    .ant-layout-content {
      margin-top: 64px;
      margin-bottom: 64px;
      padding: 16px;
      background: #f5f5f5;
    }

    .ant-layout-footer {
      position: fixed;
      bottom: 0;
      width: 100%;
      padding: 0;
      background: white;
      border-top: 1px solid #f0f0f0;
      z-index: 1000;
    }
  `,

  HeaderContent: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    padding: 0 16px;
  `,

  Logo: styled.img`
    width: 160px;
    display: flex;
    align-items: center;
  `,

  HeaderRight: styled.div`
    display: flex;
    align-items: center;
    .bell-icon {
      font-size: 24px;
      color: #fff;
    }
  `,

  BottomMenu: styled(Menu)`
    display: flex;
    justify-content: space-around;
    border: none;

    .ant-menu-item {
      text-align: center;
      padding: 8px 8px;
      flex: 1;
      border-radius: 0px;
      margin: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2px;

      .ant-menu-title-content {
        font-size: 14px;
        line-height: 1;
      }

      .anticon {
        font-size: 20px;
        margin: 0;
      }
    }

    .ant-menu-item-selected {
      color: #1890ff;
      background-color: #e6f7ff;
    }
  `,
}

export { GuestOrderLayoutWrapper }
