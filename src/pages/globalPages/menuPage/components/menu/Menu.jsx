import {
  CUSTOM_FOOD,
  IMAGES_MENU,
  SASHIMI_FOOD,
} from '@/constants/images/menuUserImage'
import { Menu } from '@/pages/globalPages/menuPage/components/menu/styled'
import { Col, Row, Flex, Carousel } from 'antd'
import { motion } from 'framer-motion'
import { theme } from '@/constants/theme'
const { animations } = theme

const MenuSection = () => {
  const gutterConfig = [
    { xs: 8, sm: 12, md: 18, lg: 24, xl: 32, xxl: 48 },
    { xs: 8, sm: 12, md: 18, lg: 24, xl: 32, xxl: 48 },
  ]

  const menuData = [
    {
      id: 'ComboA',
      title: 'Buffet combo',
      images: [IMAGES_MENU.buffetCombo, IMAGES_MENU.sake, IMAGES_MENU.food],
      variants: animations.fadeRightLeft,
    },
    {
      id: 'ComboB',
      title: 'Menu Buffet for Combo Friendly',
      images: [IMAGES_MENU.prices, IMAGES_MENU.hotpot, IMAGES_MENU.fastFood],
      variants: animations.fadeRightLeft,
    },
    {
      id: 'ComboC',
      title: 'Menu Buffet for Combo Premium',
      images: [IMAGES_MENU.regulations, IMAGES_MENU.salad, IMAGES_MENU.meat],
      variants: animations.fadeLeftRight,
    },
    {
      id: 'ComboD',
      title: 'Menu Buffet for Combo VIP',
      images: [IMAGES_MENU.drink, IMAGES_MENU.dessert, IMAGES_MENU.fastFood],
      variants: animations.fadeLeftRight,
    },
  ]

  return (
    <Menu.Section>
      <section>
        <Row gutter={gutterConfig}>
          {menuData.map((item, idx) => (
            <Col key={item.id} xs={24} md={12} lg={6}>
              <motion.div
                variants={item.variants}
                initial='hidden'
                whileInView='visible'
                transition={{ delay: idx * 0.2 }}
                viewport={{ once: true, amount: 0 }}
              >
                <MenuCarousel images={item.images} title={item.title} />
              </motion.div>
            </Col>
          ))}
        </Row>
      </section>

      <section>
        <Flex vertical gap={gutterConfig[0]}>
          <Row gutter={gutterConfig}>
            {[IMAGES_MENU.sake, IMAGES_MENU.food, IMAGES_MENU.fastFood].map(
              (src, idx) => {
                const animationImage = [
                  animations.fadeLeftRight,
                  animations.fadeDown,
                  animations.fadeInUp,
                ]
                return (
                  <Col xs={24} md={8} key={idx}>
                    <motion.div
                      variants={animationImage[idx]}
                      initial='hidden'
                      whileInView='visible'
                      viewport={{ once: true, amount: 0 }}
                    >
                      <Menu.Image src={src} alt={`food-${idx}`} />
                    </motion.div>
                  </Col>
                )
              }
            )}
          </Row>

          <Row gutter={gutterConfig}>
            <Col xs={24} md={12}>
              <motion.div
                variants={animations.fadeLeftRight}
                initial='hidden'
                whileInView='visible'
                viewport={{ once: true, amount: 0 }}
              >
                <Menu.Image src={IMAGES_MENU.hotpot} alt='hotpot' />
              </motion.div>
            </Col>
            <Col xs={24} md={12}>
              <motion.div
                variants={animations.fadeRightLeft}
                initial='hidden'
                whileInView='visible'
                viewport={{ once: true, amount: 0 }}
              >
                <Menu.Image src={IMAGES_MENU.meat} alt='meat' />
              </motion.div>
            </Col>
          </Row>
        </Flex>
      </section>

      <section>
        <Row gutter={gutterConfig}>
          <Col xs={24} md={18}>
            <motion.div
              variants={animations.fadeDown}
              initial='hidden'
              whileInView='visible'
              viewport={{ once: true, amount: 0 }}
            >
              <Menu.Image src={CUSTOM_FOOD.customMain} alt='custom-main' />
            </motion.div>
          </Col>
          <Col xs={24} md={6}>
            <Menu.Flex vertical justify='space-between'>
              {[CUSTOM_FOOD.carousel1, CUSTOM_FOOD.carousel2].map(
                (carousel, idx) => (
                  <motion.div
                    key={idx}
                    variants={animations.fadeVisible}
                    initial='hidden'
                    whileInView='visible'
                    viewport={{ once: true, amount: 0 }}
                  >
                    <Carousel
                      autoplay
                      arrows
                      infinite
                      effect='fade'
                      autoplaySpeed={3000}
                    >
                      <Menu.Image src={carousel.custom1} alt='c1' />
                      <Menu.Image src={carousel.custom2} alt='c2' />
                    </Carousel>
                  </motion.div>
                )
              )}
            </Menu.Flex>
          </Col>
        </Row>
      </section>

      <section>
        <motion.div
          variants={animations.fadeDown}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, amount: 0 }}
        >
          <Carousel autoplay arrows infinite effect='fade' autoplaySpeed={3000}>
            {Object.values(SASHIMI_FOOD).map((src, idx) => (
              <Menu.Image src={src} alt={`sashimi-${idx}`} key={idx} />
            ))}
          </Carousel>
        </motion.div>
      </section>
    </Menu.Section>
  )
}

function MenuCarousel({ images, title }) {
  return (
    <Carousel
      autoplay
      arrows
      infinite
      effect='fade'
      autoplaySpeed={3000}
      dots={false}
    >
      {images.map((img, idx) => (
        <div key={idx}>
          <Menu.Image src={img} alt={`${title} ${idx + 1}`} />
        </div>
      ))}
    </Carousel>
  )
}

export default MenuSection
