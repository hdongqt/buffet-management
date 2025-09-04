import { Carousel } from 'antd'
import { Link } from 'react-router-dom'

import {
  SliderSection,
  PriceSection,
  ReservationForm,
  AnimatedButton,
} from '@/components/common'

import {
  HOME_MENU,
  HOME_DISCOUNT,
  HOME_CUSTOMER,
  HOME_BLOG,
} from '@/constants/images/homeUserImage'

import { HomeWrapper, Menu, Introduce, Customer, Blog } from './styled'

export default function HomePage() {
  return (
    <HomeWrapper>
      <SliderSection />
      <PriceSection />

      <Menu.Section>
        <Menu.Title src={HOME_MENU.menuTitleImg} alt='Menu Title' />
        <Menu.Banner src={HOME_MENU.menuBannerImg} alt='Menu Banner' />
        <Menu.Button>
          <AnimatedButton type='primary' danger shape='round'>
            XEM CHI TIẾT
          </AnimatedButton>
        </Menu.Button>
      </Menu.Section>

      <Introduce.Section>
        <Introduce.Content>
          <Introduce.Discount>
            ƯU ĐÃI TRONG THÁNG - SAKURA BUFFET
          </Introduce.Discount>
          <Introduce.Banner
            src={HOME_DISCOUNT.discountBanner}
            alt='Discount Banner'
          />
        </Introduce.Content>
      </Introduce.Section>

      <Customer.Section>
        <Customer.Logo
          src={HOME_CUSTOMER.customerLogoImg}
          alt='Customer Logo'
        />
        <Customer.Text>
          Sau lưng em không có ai cả. Nhưng trước mặt em là Sakura Buffet
        </Customer.Text>
        <Customer.SliderWrapper>
          <Customer.SliderLeft>
            <Carousel autoplay arrows>
              {HOME_CUSTOMER.customerCarousel01.map((image, index) => (
                <div key={index}>
                  <Customer.Image
                    src={image}
                    alt={`Banner Slider ${index + 1}`}
                  />
                </div>
              ))}
            </Carousel>
          </Customer.SliderLeft>
          <Customer.SliderRight>
            <Carousel autoplay arrows>
              {HOME_CUSTOMER.customerCarousel02.map((image, index) => (
                <div key={index}>
                  <Customer.Image
                    src={image}
                    alt={`Banner Slider ${index + 3}`}
                  />
                </div>
              ))}
            </Carousel>
          </Customer.SliderRight>
        </Customer.SliderWrapper>
      </Customer.Section>

      <ReservationForm />

      <Blog.Section>
        <Blog.Logo>
          <img src={HOME_BLOG.blogLogoImg} alt='Blog logo' />
        </Blog.Logo>
        <Blog.Content>
          <h4>Bài viết mới</h4>
          <Blog.List>
            <Blog.Item>
              <Link to='/'>Lẩu nướng Nhật Bản - Văn hóa ẩm thực độc đáo</Link>
            </Blog.Item>
            <Blog.Item>
              <Link to='/'>Ẩm thực Nhật Bản: sự tinh tế trong từng món ăn</Link>
            </Blog.Item>
            <Blog.Item>
              <Link to='/'>Khám phá buffet Sakura cùng gia đình</Link>
            </Blog.Item>
          </Blog.List>
        </Blog.Content>
      </Blog.Section>
    </HomeWrapper>
  )
}

