import { Button, Flex } from 'antd'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import {
  HeaderStyle,
  UserTextStyle,
  FlexFullStyle,
  ProfileAvatarStyle,
} from './styled'
import { useSelector } from 'react-redux'

function PrivateHeader({ collapsed, setCollapsed }) {
  const { user } = useSelector((state) => state.user)
  return (
    <HeaderStyle>
      <FlexFullStyle align='center' gap='middle' justify='space-between'>
        <Button
          type='default'
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
        />
        <Flex align='center' gap={8}>
          <Flex vertical justify='center' align='end'>
            <UserTextStyle strong className='profile__name'>
              {user?.fullname}
            </UserTextStyle>
            <UserTextStyle className='profile__email'>
              {user?.email}
            </UserTextStyle>
          </Flex>
          <ProfileAvatarStyle
            size={48}
            icon={<span>{user?.fullname.at(0)}</span>}
          />
        </Flex>
      </FlexFullStyle>
    </HeaderStyle>
  )
}

export default PrivateHeader
