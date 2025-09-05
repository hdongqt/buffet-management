import { BANNER_MENU } from '@/constants/images/menuUserImage'
import { Banner } from '@/pages/globalPages/menuPage/components/banner/styled'

const BannerMenu = () => {
  return (
    <Banner.Section>
      <Banner.Carousel
        effect='fade'
        autoplaySpeed={5000}
        autoplay={{ dotDuration: false }}
      >
        {Object.values(BANNER_MENU).map((banner, index) => {
          return (
            <div key={index}>
              <Banner.Image
                src={banner}
                alt={`Banner Sakura Buffet ${index + 1}`}
              />
            </div>
          )
        })}
      </Banner.Carousel>
    </Banner.Section>
  )
}
export default BannerMenu
