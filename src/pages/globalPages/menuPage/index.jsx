import MenuContainer from '@/pages/globalPages/menuPage/styled'
import BannerMenu from '@/pages/globalPages/menuPage/components/banner/Banner'
import MenuSection from '@/pages/globalPages/menuPage/components/menu/Menu'

const MenuPage = () => {
  return (
    <MenuContainer>
      <BannerMenu />
      <MenuSection />
    </MenuContainer>
  )
}
export default MenuPage
