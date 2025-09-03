import { Col, Row, Flex } from 'antd'
import { motion } from 'framer-motion'
import { AboutWrapper, fadeTopRight, fadeInUp, fadeRightLeft, fadeLeftRight, StyleButton } from '@/pages/globalPages/introducePage/styled'
import about from '@/assets/images/introduce/about.png'

const AboutSection = () => (
  <AboutWrapper
    as={motion.section}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.3 }}
  >
    <Row justify='space-between' gutter={[24, 48]}>
      <Col xs={24} md={12} className='about__content'>
        <Flex align='center' vertical>
          <motion.h2 className='about__title' variants={fadeRightLeft}>
            Sakura
          </motion.h2>
          <motion.h3 className='about__subtitle' variants={fadeRightLeft}>
            hơn 150 món ăn
          </motion.h3>

          <motion.div className='about__desc' variants={fadeTopRight}>
            <p>
              Sakura mang tới bộ 4 menu với mức giá 299K – 349K – 399K –
              499K, đáp ứng mọi sở thích của khách hàng. Thực đơn của Sakura
              lên tới hơn 150 món, đa dạng các nhóm món thịt nướng, sushi, sashimi,
              lẩu, súp Nhật, cơm, mỳ, món ăn chơi, salad,…
            </p>
            <p>
              Những tín đồ mê mẩn thịt nướng cùng sushi sẽ vô cùng hài lòng khi lựa
              chọn buffet 299K. Trong khi đó, buffet 349K sẽ dành cho những ai muốn
              thưởng thức thêm sashimi cá hồi không giới hạn. Buffet 299K và 349K
              đều có tráng miệng dưa hấu tươi mát.
            </p>
            <p>
              Buffet 399K xì xèo thêm hải sản cùng các loại sushi cao cấp, sashimi
              tổng hợp, kết bữa với kem sữa chua mềm mịn. Và buffet 499K hẳn là lựa
              chọn không thể bỏ lỡ của những ai mê mẩn thịt nướng cao cấp, hải sản,
              lẩu shabu shabu wagyu với kết thúc bữa ăn là brulee trà xanh béo ngậy.
            </p>
            <p>
              Thời gian order món tại Sakura là 120 phút tính từ thời gian
              order món đầu tiên. Nhân viên sẽ thông báo 20 phút trước khi kết thúc
              thời gian order. Trong thời gian cao điểm, quý khách vui lòng đợi tối
              đa 15 phút với món lạnh và tối đa 20 phút với món nóng.
            </p>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true }}
          >
            <StyleButton className='about__button'>
              thực đơn
            </StyleButton>
          </motion.div>
        </Flex>
      </Col>

      <Col xs={24} md={12} className='about__image'>
        <motion.img
          src={about}
          alt='Sakura Buffet'
          variants={fadeLeftRight}
        />
      </Col>
    </Row>
  </AboutWrapper>
)

export default AboutSection
