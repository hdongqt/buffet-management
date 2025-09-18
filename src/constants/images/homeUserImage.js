import homeSlider01 from '@/assets/images/home/slider/banner-01.jpg'
import homeSlider01Low from '@/assets/images/home/slider/banner-01-low.jpg'
import homeSlider02 from '@/assets/images/home/slider/banner-02.jpg'
import homeSlider02Low from '@/assets/images/home/slider/banner-02-low.jpg'
import homeSlider03 from '@/assets/images/home/slider/banner-03.jpg'
import homeSlider03Low from '@/assets/images/home/slider/banner-03-low.jpg'

import backgroundHome from '@/assets/images/home/common/background.jpg'
import backgroundHome02 from '@/assets/images/home/common/background-02.jpg'

import discountBanner from '@/assets/images/home/discount/discount-01.jpg'

import menuTitleImg from '@/assets/images/home/menu/menu-title.png'
import menuBannerImg from '@/assets/images/home/menu/menu-banner.jpg'
import menuBannerImgLow from '@/assets/images/home/menu/menu-banner-low.jpg'

import customerLogoImg from '@/assets/images/home/customer/customer-logo.png'
import bannerCarousel01 from '@/assets/images/home/customer/customer-slider-01.jpg'
import bannerCarousel02 from '@/assets/images/home/customer/customer-slider-02.jpg'
import bannerCarousel03 from '@/assets/images/home/customer/customer-slider-03.jpg'
import bannerCarousel04 from '@/assets/images/home/customer/customer-slider-04.jpg'
import bannerCarousel05 from '@/assets/images/home/customer/customer-slider-05.jpg'
import bannerCarousel06 from '@/assets/images/home/customer/customer-slider-06.jpg'

import blogLogoImg from '@/assets/images/home/blog/blog-logo.png'

import price01 from '@/assets/images/home/price/price-01.jpg'
import price02 from '@/assets/images/home/price/price-02.jpg'
import price03 from '@/assets/images/home/price/price-03.jpg'
import price04 from '@/assets/images/home/price/price-04.jpg'

import backgroundReservation from '@/assets/images/home/reservation/background.jpg'
import logoReservation from '@/assets/images/home/reservation/reservation-logo.png'

const HOME_PRICE = {
  price01,
  price02,
  price03,
  price04,
}

const HOME_MENU = {
  menuTitleImg,
  menuBannerImg: {
    high: menuBannerImg,
    low: menuBannerImgLow,
  },
}

const HOME_SLIDER = {
  homeSlider01: {
    high: homeSlider01,
    low: homeSlider01Low,
  },
  homeSlider02: {
    high: homeSlider02,
    low: homeSlider02Low,
  },
  homeSlider03: {
    high: homeSlider03,
    low: homeSlider03Low,
  },
}

const HOME_BACKGROUND = {
  backgroundHome,
  backgroundHome02,
}

const HOME_DISCOUNT = {
  discountBanner,
}

const HOME_CUSTOMER = {
  customerLogoImg,
  customerCarousel01: [bannerCarousel01, bannerCarousel02, bannerCarousel03],
  customerCarousel02: [bannerCarousel04, bannerCarousel05, bannerCarousel06],
}

const HOME_BLOG = {
  blogLogoImg,
}

const HOME_RESERVATION = {
  backgroundReservation,
  logoReservation,
}

export {
  HOME_MENU,
  HOME_SLIDER,
  HOME_BACKGROUND,
  HOME_DISCOUNT,
  HOME_CUSTOMER,
  HOME_BLOG,
  HOME_RESERVATION,
  HOME_PRICE,
}
