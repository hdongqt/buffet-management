import Price from '@/components/common/price'
import Slider from '@/components/common/slider'
import MenuTitle from '@/assets/images/home/menu/menu-title.png'
import MenuBanner from '@/assets/images/home/menu/menu-banner.jpg'
import { HomeStyled } from './styled'
import AnimatedButton from '@/components/common/animatedButton'
import DiscountBanner from '@/assets/images/home/discount/discount-01.jpg'
import CustomerLogo from '@/assets/images/home/customer/customer-logo.png'
import CustomerSlider01 from '@/assets/images/home/customer/customer-slider-01.jpg'
import CustomerSlider02 from '@/assets/images/home/customer/customer-slider-02.jpg'
import CustomerSlider03 from '@/assets/images/home/customer/customer-slider-03.jpg'
import CustomerSlider04 from '@/assets/images/home/customer/customer-slider-04.jpg'
import CustomerSlider05 from '@/assets/images/home/customer/customer-slider-05.jpg'
import CustomerSlider06 from '@/assets/images/home/customer/customer-slider-06.jpg'
import BlogLogo from '@/assets/images/home/blog/blog-logo.png'
import { Carousel } from 'antd'
import ReservationForm from '@/components/common/reservation-form'
import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <HomeStyled>
      <Slider />
      <Price />
      <section className='menu'>
        <img className='menu__title' src={MenuTitle} alt='Menu Title' />
        <img className='menu__banner' src={MenuBanner} alt='Menu Banner' />
        <div className='menu__button'>
          <AnimatedButton>XEM CHI TIẾT</AnimatedButton>
        </div>
      </section>
      <section className='introduce'>
        <div className='introduce__content'>
          <div className='introduce__discount'>
            <h3>ƯU ĐÃI TRONG THÁNG - SAKURA BUFFET</h3>
          </div>
          <div className='introduce__banner'>
            <img
              src={DiscountBanner}
              alt='ƯU ĐÃI TRONG THÁNG - SAKURA BUFFET'
            />
          </div>
        </div>
      </section>
      <section className='customer'>
        <div className='container'>
          <img
            className='customer__logo'
            src={CustomerLogo}
            alt='customer logo'
          />
          <p className='customer__text'>
            Sau lưng em không có ai cả. Nhưng trước mặt em là Sakura Buffet
          </p>
          <div className='customer__slider'>
            <div className='customer__slider-left'>
              <Carousel autoplay arrows>
                <div>
                  <img
                    className='customer__slider-image'
                    src={CustomerSlider01}
                    alt=''
                  />
                </div>
                <div>
                  <img
                    className='customer__slider-image'
                    src={CustomerSlider02}
                    alt=''
                  />
                </div>
                <div>
                  <img
                    className='customer__slider-image'
                    src={CustomerSlider03}
                    alt=''
                  />
                </div>
              </Carousel>
            </div>
            <div className='customer__slider-right'>
              <Carousel autoplay arrows>
                <div>
                  <img
                    className='customer__slider-image'
                    src={CustomerSlider04}
                    alt=''
                  />
                </div>
                <div>
                  <img
                    className='customer__slider-image'
                    src={CustomerSlider05}
                    alt=''
                  />
                </div>
                <div>
                  <img
                    className='customer__slider-image'
                    src={CustomerSlider06}
                    alt=''
                  />
                </div>
              </Carousel>
            </div>
          </div>
        </div>
      </section>
      <ReservationForm />
      <section className='blog'>
        <div className='container'>
          <div className='blog__logo'>
            <img src={BlogLogo} alt='' />
          </div>
          <div className='blog__content'>
            <h4>Bài viết mới</h4>
            <ul className='blog__content-list'>
              <li className='blog__content-item'>
                <Link to='/'>Lẩu nướng Nhật Bản - Văn hóa ẩm thực độc đáo</Link>
              </li>
              <li className='blog__content-item'>
                <Link to='/'>Lẩu nướng Nhật Bản - Văn hóa ẩm thực độc đáo</Link>
              </li>
              <li className='blog__content-item'>
                <Link to='/'>Lẩu nướng Nhật Bản - Văn hóa ẩm thực độc đáo</Link>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </HomeStyled>
  )
}

