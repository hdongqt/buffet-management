import { Layout } from 'antd'
import { styled } from 'styled-components'

const SideBarStyle = styled(Layout.Sider)`
  background: #fff;
  display: flex;
  flex-direction: column;
`

const SideBarLogoStyle = styled.div`
  font-size: 25px;
  font-weight: bold;
  text-align: center;
  height: 64px;
  padding: 10px;
  border-bottom: 1px solid #f0f0f0;
  font-weight: bold;
  text-align: center;
  white-space: nowrap;
  color: #165dc0;
  & .sidebar__logo-icon {
    margin-right: 5px;
    color: #165dc0;
    &.collapsed {
      margin-right: 0;
      margin-left: 2px;
    }
  }
`

export { SideBarStyle, SideBarLogoStyle }
