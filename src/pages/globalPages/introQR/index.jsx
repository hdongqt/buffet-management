import React from 'react'
import { Col, Row } from 'antd'
import { motion } from 'framer-motion'
import { QrcodeOutlined } from '@ant-design/icons'

import { featureHero } from './featureHero'

import { theme } from '@/constants/theme'
import { MAIN_IMAGES } from '@/constants/images/mainUserImage'

import { IntroQRStyles } from './styled'

const { animations } = theme

const steps = [
  {
    step: '01',
    title: 'Quét QR Code',
    description: 'Sử dụng camera điện thoại quét mã QR trên bàn ăn',
  },
  {
    step: '02',
    title: 'Xem Menu',
    description: 'Duyệt menu số với hình ảnh và mô tả chi tiết',
  },
  {
    step: '03',
    title: 'Đặt Món',
    description: 'Chọn món ăn, số lượng và gửi order trực tiếp',
  },
  {
    step: '04',
    title: 'Gọi nhân viên',
    description: 'Gọi nhân viên khi cần hỗ trợ hoặc thanh toán',
  },
]

const IntroQR = () => {
  return (
    <IntroQRStyles.Container bgImage={MAIN_IMAGES.tableQRIntroImage}>
      <IntroQRStyles.ContentWrapper>
        <motion.div
          initial='hidden'
          animate='visible'
          variants={animations.containerVariants}
        >
          <IntroQRStyles.HeroSection>
            <motion.div variants={animations.fadeDropJump}>
              <IntroQRStyles.QRCodeDemo>
                <QrcodeOutlined className='qr-icon' />
              </IntroQRStyles.QRCodeDemo>
            </motion.div>

            <motion.div variants={animations.fadeUpVariants}>
              <IntroQRStyles.HeroTitle level={1}>
                Đặt Món Thông Minh
              </IntroQRStyles.HeroTitle>
            </motion.div>

            <motion.div variants={animations.fadeDropJump}>
              <IntroQRStyles.HeroParagraph>
                Trải nghiệm đặt món hoàn toàn mới - Chỉ cần quét QR, chọn món và
                thưởng thức. Nhanh chóng, an toàn và tiện lợi!
              </IntroQRStyles.HeroParagraph>
            </motion.div>
          </IntroQRStyles.HeroSection>

          <Row gutter={[24, 24]}>
            {featureHero &&
              featureHero.map((feature, index) => (
                <Col xs={24} sm={12} lg={6} key={`${feature.title}-${index}`}>
                  <motion.div
                    variants={animations.fadeUpVariants}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <IntroQRStyles.FeatureCard>
                      <IntroQRStyles.FeatureIconWrapper>
                        {feature.icon}
                        <IntroQRStyles.FeatureTitle level={4}>
                          {feature.title}
                        </IntroQRStyles.FeatureTitle>
                        <IntroQRStyles.FeatureDescription>
                          {feature.description}
                        </IntroQRStyles.FeatureDescription>
                      </IntroQRStyles.FeatureIconWrapper>
                    </IntroQRStyles.FeatureCard>
                  </motion.div>
                </Col>
              ))}
          </Row>

          <motion.div variants={animations.fadeUpVariants}>
            <IntroQRStyles.HeroTitle level={2}>
              Cách Thức Hoạt Động
            </IntroQRStyles.HeroTitle>
          </motion.div>

          <Row gutter={[24, 24]}>
            {steps.map((step, index) => (
              <Col xs={24} sm={12} lg={6} key={`${step.title}-${index}`}>
                <motion.div
                  variants={animations.fadeUpVariants}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <IntroQRStyles.StepCard>
                    <IntroQRStyles.StepNumber>
                      {step.step}
                    </IntroQRStyles.StepNumber>
                    <IntroQRStyles.StepTitle level={4}>
                      {step.title}
                    </IntroQRStyles.StepTitle>
                    <IntroQRStyles.StepDescription>
                      {step.description}
                    </IntroQRStyles.StepDescription>
                  </IntroQRStyles.StepCard>
                </motion.div>
              </Col>
            ))}
          </Row>
        </motion.div>
      </IntroQRStyles.ContentWrapper>
    </IntroQRStyles.Container>
  )
}

export default IntroQR
