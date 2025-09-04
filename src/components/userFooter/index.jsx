import Logo from '@/assets/images/main/logo.png'
import { FooterContentStyled, FooterCopyrightStyled } from './styled'

export default function UserFooter() {
  return (
    <footer>
      <FooterContentStyled justify='space-between'>
        <div className='footer-logo'>
          <img src={Logo} alt='Yen Yakiniku' />
        </div>

        <div className='footer-contact'>
          <p className='footer-contact__title'>LIÊN HỆ:</p>
          <ul>
            <li>SDT: 0999.888.888</li>
            <li>Email: sakura@gmail.com</li>
            <li>Địa chỉ: 28 Lý Thường Kiệt, Vĩnh Ninh, Thành phố Huế</li>
          </ul>
        </div>
      </FooterContentStyled>
      <FooterCopyrightStyled>
        2025 By Sakura Buffet. All rights reserved
      </FooterCopyrightStyled>
    </footer>
  )
}
