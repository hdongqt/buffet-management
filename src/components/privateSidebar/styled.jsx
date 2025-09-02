import { Layout } from 'antd'
import { styled } from 'styled-components'

const SideBarStyle = styled(Layout.Sider)`
  background: #fff;
  display: flex;
  flex-direction: column;
`

const SideBarLogoStyle = styled.div`
  font-size: 2.5rem;
  font-weight: bold;
  text-align: center;
  height: 6.4rem;
  padding: 1rem;
  border-bottom: 1px solid #f0f0f0;
  font-weight: bold;
  text-align: center;
  white-space: nowrap;
  color: #165dc0;
  & .sidebar__logo-icon {
    margin-right: 0.5rem;
    color: #165dc0;
    &.collapsed {
      margin-right: 0;
      margin-left: 0.2rem;
    }
  }
`

export { SideBarStyle, SideBarLogoStyle }
