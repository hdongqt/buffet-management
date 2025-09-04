import { Link } from 'react-router-dom'
import Logo from '@/assets/images/main/logo.png'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { useScroll } from '@/hooks/useScroll'
import { HeaderStyled, NavLinkStyled } from './styled'
import { USER_MENU } from '@/components/menu/userMenu'

export default function UserHeader() {
  const [openMenuMobile, setOpenMenuMobile] = useState(false)
  const isScrollLarge = useScroll(50)

  return (
    <HeaderStyled
      className={`header ${openMenuMobile ? 'mobile-open' : ''} ${
        isScrollLarge ? 'scroll-large' : ''
      }`}
    >
      <Link to='/' className='header__logo'>
        <img src={Logo} alt='Sakura Buffet' />
      </Link>
      <button className='header__toggle'>
        {openMenuMobile ? (
          <MenuFoldOutlined
            className='header__toggle-icon'
            onClick={() => setOpenMenuMobile(false)}
          />
        ) : (
          <MenuUnfoldOutlined
            className='header__toggle-icon'
            onClick={() => setOpenMenuMobile(true)}
          />
        )}
      </button>
      <nav className='header__nav'>
        <ul className={`header__nav-list ${openMenuMobile && 'mobile-open'}`}>
          {USER_MENU.map((item) => (
            <li key={`header-${item.name}`}>
              <NavLinkStyled
                to={item.path}
                onClick={() => setOpenMenuMobile(false)}
              >
                {item.name}
              </NavLinkStyled>
            </li>
          ))}
        </ul>
      </nav>
    </HeaderStyled>
  )
}
