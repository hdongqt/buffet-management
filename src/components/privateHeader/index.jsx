import { Flex, Grid } from 'antd'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'
import {
  HeaderStyle,
  UserTextStyle,
  FlexFullStyle,
  ProfileAvatarStyle,
  ButtonCollapseStyle,
} from './styled'

const { useBreakpoint } = Grid

function PrivateHeader({ collapsed, setCollapsed }) {
  const { user } = useSelector((state) => state.user)

  const screens = useBreakpoint()

  return (
    <HeaderStyle>
      <FlexFullStyle
        align='center'
        gap='middle'
        justify={!screens.md ? 'end' : 'space-between'}
      >
        <ButtonCollapseStyle
          type='default'
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          $isFixed={!screens.md}
          size='large'
          $isCollapsed={collapsed}
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
