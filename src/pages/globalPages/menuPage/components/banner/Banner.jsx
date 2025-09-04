import { BANNER_MENU } from '@/constants/images/menuUserImage'
import {
  StyledImage,
  StyledBanner,
  StyledCarousel,
} from '@/pages/globalPages/menuPage/components/banner/styled'

const BannerMenu = () => {
  return (
    <StyledBanner>
      <StyledCarousel
        effect='fade'
        autoplaySpeed={5000}
        autoplay={{ dotDuration: false }}
      >
        {Object.values(BANNER_MENU).map((banner, index) => {
          return (
            <div key={index}>
              <StyledImage
                src={banner}
                alt={`Banner Sakura Buffet ${index + 1}`}
              />
            </div>
          )
        })}
      </StyledCarousel>
    </StyledBanner>
  )
}
export default BannerMenu
