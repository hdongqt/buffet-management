import { Link } from 'react-router-dom'
import { HeaderStyled } from './styled'

export function Header() {
  return (
    <HeaderStyled>
      <nav className='header__nav'>
        <Link to=''>About</Link>
        <Link to='experience'>Experience</Link>
        <Link to='education'>Education</Link>
        <Link to='projects'>Projects</Link>
      </nav>
    </HeaderStyled>
  )
}
