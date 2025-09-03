import { Carousel, Col, Row, Flex } from 'antd'
import { motion } from 'framer-motion'
import {
  CustomerWrapper,
  fadeDropJump,
  fadeInUp,
  fadeRightLeft,
  fadeLeftRight,
} from '@/pages/globalPages/introducePage/styled'

import LabelCustomer from '@/assets/images/introduce/Restaurant-Customer.png'
import carousel1 from '@/assets/images/introduce/customer-in-restaurant-1.webp'
import carousel2 from '@/assets/images/introduce/customer-in-restaurant-2.webp'
import carousel3 from '@/assets/images/introduce/customer-in-restaurant-3.webp'
import carousel4 from '@/assets/images/introduce/customer-in-restaurant-4.webp'
import carousel5 from '@/assets/images/introduce/customer-in-restaurant-5.webp'

const carouselData = [
  [carousel1, carousel2, carousel3],
  [carousel4, carousel5, carousel1],
]

const carouselProps = {
  effect: 'fade',
  arrows: true,
  autoplay: true,
  autoplaySpeed: 3000,
  className: 'customer__carousel',
}

const CustomerCarousel = ({ images }) => (
  <Carousel {...carouselProps}>
    {images.map((src, idx) => (
      <div key={idx} className='customer__carousel-item'>
        <img src={src} alt={`Khách hàng ${idx + 1}`} loading='lazy' />
      </div>
    ))}
  </Carousel>
)

const CustomerSection = () => {
  const variants = [fadeRightLeft, fadeLeftRight]

  return (
    <CustomerWrapper
      as={motion.section}
      initial='hidden'
      whileInView='visible'
      viewport={{ once: true, amount: 0.3 }}
    >
      <Flex vertical align='center' justify='center'>
        <motion.img
          src={LabelCustomer}
          alt='Khách hàng tại Sakura Buffet'
          className='customer__label'
          loading='lazy'
          variants={fadeDropJump}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, amount: 0.8 }}
        />

        <motion.p
          variants={fadeInUp}
          className='customer__desc'
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, amount: 0.2 }}
        >
          Mặc ngoài kia mưa gió bão bùng, hàng hóa đùng đùng tăng giá, thì bên
          trong cánh cửa nhà Sakura Buffet vẫn bình yên đến lạ với ƯU ĐÃI ĐI 4
          TÍNH 3 với 90 món ngon hấp dẫn
        </motion.p>

        <Row
          gutter={[
            { xs: 16, sm: 24, md: 24, lg: 32, xl: 48, xxl: 64 },
            { xs: 16, sm: 24, md: 24, lg: 32, xl: 48, xxl: 64 },
          ]}
        >
          {carouselData.map((images, idx) => (
            <Col key={idx} xs={24} sm={24} md={12}>
              <motion.div
                variants={variants[idx]}
                initial='hidden'
                whileInView='visible'
                viewport={{ once: true, amount: 0.1 }}
              >
                <CustomerCarousel images={images} />
              </motion.div>
            </Col>
          ))}
        </Row>
      </Flex>
    </CustomerWrapper>
  )
}

export default CustomerSection
