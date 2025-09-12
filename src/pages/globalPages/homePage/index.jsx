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
import AboutSection from '../aboutPage/components/about/About'
import { theme } from '@/constants/theme'
import { motion } from 'framer-motion'

const { animations } = theme

const MotionMenu = motion(Menu.Section)
const MotionIntroduce = motion(Introduce.Section)
const MotionCustomerLogo = motion(Customer.Logo)
const MotionCustomerSliderLeft = motion(Customer.SliderLeft)
const MotionCustomerSliderRight = motion(Customer.SliderRight)
const MotionBlog = motion(Blog.Content)

export default function HomePage() {
  return (
    <HomeWrapper>
      <SliderSection />
      <PriceSection />

      <MotionMenu
        variants={animations.fadeInUp}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, amount: 0.3 }}
      >
        <Menu.Title src={HOME_MENU.menuTitleImg} alt='Menu Title' />
        <Menu.Banner src={HOME_MENU.menuBannerImg} alt='Menu Banner' />
        <Menu.Button>
          <AnimatedButton type='primary' danger shape='round'>
            XEM CHI TIẾT
          </AnimatedButton>
        </Menu.Button>
      </MotionMenu>

      <AboutSection />

      <MotionIntroduce
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, amount: 0.3 }}
        variants={animations.staggerFadeUp}
      >
        <Introduce.Content>
          <Introduce.Discount>
            ƯU ĐÃI TRONG THÁNG - SAKURA BUFFET
          </Introduce.Discount>
          <Introduce.Banner
            src={HOME_DISCOUNT.discountBanner}
            alt='Discount Banner'
          />
        </Introduce.Content>
      </MotionIntroduce>

      <Customer.Section>
        <MotionCustomerLogo
          src={HOME_CUSTOMER.customerLogoImg}
          alt='Customer Logo'
          variants={animations.fadeDropJump}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, amount: 0.8 }}
        />
        <Customer.Text>
          Sau lưng em không có ai cả. Nhưng trước mặt em là Sakura Buffet
        </Customer.Text>
        <Customer.SliderWrapper>
          <MotionCustomerSliderLeft
            variants={animations.fadeRightLeft}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, amount: 0.3 }}
          >
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
          </MotionCustomerSliderLeft>
          <MotionCustomerSliderRight
            variants={animations.fadeLeftRight}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, amount: 0.3 }}
          >
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
          </MotionCustomerSliderRight>
        </Customer.SliderWrapper>
      </Customer.Section>

      <ReservationForm />

      <Blog.Section>
        <Blog.Logo>
          <img src={HOME_BLOG.blogLogoImg} alt='Blog logo' />
        </Blog.Logo>
        <MotionBlog
          variants={animations.fadeInUp}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, amount: 0.3 }}
        >
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
        </MotionBlog>
      </Blog.Section>
    </HomeWrapper>
  )
}

