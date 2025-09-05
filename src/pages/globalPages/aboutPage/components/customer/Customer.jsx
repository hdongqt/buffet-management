import { Carousel, Col, Row, Flex } from 'antd'
import { motion } from 'framer-motion'
import {
  CustomerWrapper,
  CustomerLabel,
  CustomerDesc,
  CustomerCarousel,
  Image,
} from '@/pages/globalPages/aboutPage/components/customer/styled'
import { CAROUSELS } from '@/constants/images/aboutUserImage'
import { theme } from '@/constants/theme'

const { animations } = theme

const carouselData = [
  [CAROUSELS.carousel1, CAROUSELS.carousel2, CAROUSELS.carousel3],
  [CAROUSELS.carousel4, CAROUSELS.carousel5, CAROUSELS.carousel1],
]

const carouselProps = {
  effect: 'fade',
  arrows: true,
  autoplay: true,
  autoplaySpeed: 3000,
}

const MotionWrapper = motion(CustomerWrapper)
const MotionLabel = motion(CustomerLabel)
const MotionDesc = motion(CustomerDesc)

const Customer = () => {
  const variants = [animations.fadeRightLeft, animations.fadeLeftRight]

  return (
    <MotionWrapper
      initial='hidden'
      whileInView='visible'
      viewport={{ once: true, amount: 0.3 }}
    >
      <Flex vertical align='center' justify='center'>
        <MotionLabel
          src={CAROUSELS.labelCustomer}
          alt='Khách hàng tại Sakura Buffet'
          loading='lazy'
          variants={animations.fadeDropJump}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, amount: 0.8 }}
        />

        <MotionDesc
          variants={animations.fadeInUp}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, amount: 0.2 }}
        >
          Mặc ngoài kia mưa gió bão bùng, hàng hóa đùng đùng tăng giá, thì bên
          trong cánh cửa nhà Sakura Buffet vẫn bình yên đến lạ với ƯU ĐÃI ĐI 4
          TÍNH 3 với 90 món ngon hấp dẫn
        </MotionDesc>

        <Row gutter={[16, 16]}>
          {carouselData.map((images, idx) => (
            <Col key={idx} xs={24} md={12}>
              <motion.div
                variants={variants[idx]}
                initial='hidden'
                whileInView='visible'
                viewport={{ once: true, amount: 0.1 }}
              >
                <CustomerCarousels images={images} />
              </motion.div>
            </Col>
          ))}
        </Row>
      </Flex>
    </MotionWrapper>
  )
}

const CustomerCarousels = ({ images }) => (
  <CustomerCarousel>
    <Carousel {...carouselProps}>
      {images.map((image, idx) => (
        <div key={idx}>
          <Image src={image} alt={`Khách hàng ${idx + 1}`} />
        </div>
      ))}
    </Carousel>
  </CustomerCarousel>
)

export default Customer
