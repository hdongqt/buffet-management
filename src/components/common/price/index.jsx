import Price01 from '@/assets/images/home/price/price-01.jpg'
import Price02 from '@/assets/images/home/price/price-02.jpg'
import Price03 from '@/assets/images/home/price/price-03.jpg'
import Price04 from '@/assets/images/home/price/price-04.jpg'
import { PriceStyled } from './styled'
import { motion } from 'framer-motion'

export default function Price() {
  const listPrice = [
    {
      path: Price01,
    },
    {
      path: Price02,
    },
    {
      path: Price03,
    },
    {
      path: Price04,
    },
  ]
  return (
    <PriceStyled>
      <section className='price'>
        {listPrice.map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <img
              className='price__item'
              src={item.path}
              alt={`Price ${index + 1}`}
            />
          </motion.div>
        ))}
      </section>
    </PriceStyled>
  )
}
