import { Banner, Container, Image } from './styled'
import { motion } from 'framer-motion'
import Customer from '@/pages/globalPages/aboutPage/components/customer/Customer'
import About from '@/pages/globalPages/aboutPage/components/about/About'
import banner from '@/assets/images/introduce/Banner.jpg'

const IntroducePage = () => {
  return (
    <Container>
      <motion.div
        className='introduce'
        initial='hidden'
        viewport={{ once: true }}
      >
        <Banner>
          <Image src={banner} alt='Banner Introduce about My Restaurant' />
        </Banner>
        <About />
        <Customer />
      </motion.div>
    </Container>
  )
}
export default IntroducePage
