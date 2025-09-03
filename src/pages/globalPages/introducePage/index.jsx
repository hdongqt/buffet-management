import {
  BannerWrapper,
  Container,
} from './styled'
import { motion } from 'framer-motion'
import CustomerSection from '@/pages/globalPages/introducePage/components/CustomerSection '
import AboutSection from '@/pages/globalPages/introducePage/components/AboutSection'
import banner from '@/assets/images/introduce/Banner.jpg'

const IntroducePage = () => {
  return (
    <Container>
      <motion.div
        className='introduce'
        initial='hidden'
        viewport={{ once: true }}
      >
        <BannerWrapper>
          <img src={banner} alt='Banner Introduce about My Restaurant' />
        </BannerWrapper>
        <AboutSection />
        <CustomerSection />
      </motion.div>
    </Container>
  )
}
export default IntroducePage
