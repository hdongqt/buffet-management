import { Banner, Container, Image } from './styled'
import Customer from '@/pages/globalPages/aboutPage/components/customer/Customer'
import About from '@/pages/globalPages/aboutPage/components/about/About'
import { ABOUT_IMAGES } from '@/constants/images/aboutUserImage'

const AboutPage = () => {
  return (
    <Container>
      <Banner>
        <Image
          src={ABOUT_IMAGES.banner}
          alt='Banner Introduce about My Restaurant'
        />
      </Banner>
      <About />
      <Customer />
    </Container>
  )
}
export default AboutPage
