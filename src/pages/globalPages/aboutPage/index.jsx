import { Container, Banner } from './styled'
import CustomerSection from '@/pages/globalPages/aboutPage/components/customer/Customer'
import AboutSection from '@/pages/globalPages/aboutPage/components/about/About'
import { ABOUT_IMAGES } from '@/constants/images/aboutUserImage'

const AboutPage = () => {
  return (
    <Container>
      <Banner.Section>
        <Banner.Image
          src={ABOUT_IMAGES.banner}
          alt='Banner Introduce about My Restaurant'
        />
      </Banner.Section>
      <AboutSection />
      <CustomerSection />
    </Container>
  )
}
export default AboutPage
