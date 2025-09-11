// import { PriceStyled, PriceItem } from './styled'
import { Price } from './styled'
import { motion } from 'framer-motion'
import { HOME_PRICE } from '@/constants/images/homeUserImage'
import { theme } from '@/constants/theme'

const { animations } = theme
const MotionPrice = motion(Price.Wrapper)
const MotionPriceItem = motion(Price.Item)

export default function PriceSection() {
  return (
    <MotionPrice
      initial='hidden'
      whileInView='visible'
      viewport={{ once: true, amount: 0.3 }}
    >
      {Object.values(HOME_PRICE).map((item, index) => (
        <motion.div
          key={index}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <MotionPriceItem
            variants={animations.fadeLeftRight}
            src={item}
            alt={`Price ${index + 1}`}
          />
        </motion.div>
      ))}
    </MotionPrice>
  )
}
