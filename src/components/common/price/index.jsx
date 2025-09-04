// import { PriceStyled, PriceItem } from './styled'
import { Price } from './styled'
import { motion } from 'framer-motion'
import { HOME_PRICE } from '@/constants/images/homeUserImage'

export default function PriceSection() {
  return (
    <Price.Wrapper>
      {Object.values(HOME_PRICE).map((item, index) => (
        <motion.div
          key={index}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Price.Item src={item} alt={`Price ${index + 1}`} />
        </motion.div>
      ))}
    </Price.Wrapper>
  )
}
