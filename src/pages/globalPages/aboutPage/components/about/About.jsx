import { Col, Row } from 'antd'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

import { ABOUT_IMAGES } from '@/constants/images/aboutUserImage'
import { theme } from '@/constants/theme'
import {
  AboutWrapper,
  About,
} from '@/pages/globalPages/aboutPage/components/about/styled'
import { AnimatedButton } from '@/components/common'

const { animations } = theme

const MotionWrapper = motion(AboutWrapper)
const MotionTitle = motion(About.Title)
const MotionSubtitle = motion(About.Subtitle)
const MotionDesc = motion(About.Desc)
const MotionButton = motion(About.Button)
const MotionImage = motion(About.Image)

const AboutSection = () => {
  const gutterConfig = [
    { lg: 32, xl: 48, xxl: 64 },
    { xs: 32, sm: 48, md: 64 },
  ]

  return (
    <MotionWrapper
      initial='hidden'
      whileInView='visible'
      viewport={{ once: true, amount: 0.2 }}
    >
      <Row justify='space-between' gutter={gutterConfig}>
        <Col xs={24} lg={12}>
          <About.Content align='center' vertical>
            <MotionTitle variants={animations.fadeRightLeft}>
              Sakura Buffet
            </MotionTitle>

            <MotionSubtitle variants={animations.fadeRightLeft}>
              hơn 150 món ăn
            </MotionSubtitle>

            <MotionDesc variants={animations.fadeTopRight}>
              <p>
                Sakura mang tới bộ 4 menu với mức giá 299K – 349K – 399K – 499K,
                đáp ứng mọi sở thích của khách hàng. Thực đơn của Sakura lên tới
                hơn 150 món, đa dạng các nhóm món thịt nướng, sushi, sashimi,
                lẩu, súp Nhật, cơm, mỳ, món ăn chơi, salad,…
              </p>
              <p>
                Những tín đồ mê mẩn thịt nướng cùng sushi sẽ vô cùng hài lòng
                khi lựa chọn buffet 299K. Trong khi đó, buffet 349K sẽ dành cho
                những ai muốn thưởng thức thêm sashimi cá hồi không giới hạn.
                Buffet 299K và 349K đều có tráng miệng dưa hấu tươi mát.
              </p>
              <p>
                Buffet 399K xì xèo thêm hải sản cùng các loại sushi cao cấp,
                sashimi tổng hợp, kết bữa với kem sữa chua mềm mịn. Và buffet
                499K hẳn là lựa chọn không thể bỏ lỡ của những ai mê mẩn thịt
                nướng cao cấp, hải sản, lẩu shabu shabu wagyu với kết thúc bữa
                ăn là brulee trà xanh béo ngậy.
              </p>
              <p>
                Thời gian order món tại Sakura là 120 phút tính từ thời gian
                order món đầu tiên. Nhân viên sẽ thông báo 20 phút trước khi kết
                thúc thời gian order. Trong thời gian cao điểm, quý khách vui
                lòng đợi tối đa 15 phút với món lạnh và tối đa 20 phút với món
                nóng.
              </p>
            </MotionDesc>

            <Link to='/menu'>
              <AnimatedButton type='primary' shape='round' danger>
                THỰC ĐƠN
              </AnimatedButton>
            </Link>
          </About.Content>
        </Col>

        <Col xs={24} lg={12}>
          <MotionImage
            src={ABOUT_IMAGES.about}
            alt='Sakura Buffet'
            variants={animations.fadeLeftRight}
          />
        </Col>
      </Row>
    </MotionWrapper>
  )
}

export default AboutSection

