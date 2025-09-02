import { Layout, Flex, Avatar, Typography } from 'antd'
import styled from 'styled-components'

const HeaderStyle = styled(Layout.Header)`
  display: flex;
  align-items: center;
  padding: 0 16px;
  background: #fff;
  border-bottom: 1px solid #f0f0f0;
`

const UserTextStyle = styled(Typography.Text)`
  text-overflow: ellipsis;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  &.profile__name {
    font-weight: 600;
    font-size: 1.6rem;
    line-height: 1.2;
    height: 2.4;
  }
  &.profile__email {
    color: #666;
    font-size: 1.4rem;
    line-height: 1.4;
    height: 1.4;
    -webkit-line-clamp: 1;
  }
`

const FlexFullStyle = styled(Flex)`
  width: 100%;
`

const ProfileAvatarStyle = styled(Avatar)`
  background-color: var(--ant-color-primary);
  min-width: 48px;
`

export { HeaderStyle, UserTextStyle, FlexFullStyle, ProfileAvatarStyle }
