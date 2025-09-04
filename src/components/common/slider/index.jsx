import { Carousel } from 'antd'
import BannerSlider01 from '@/assets/images/home/slider/banner-01.jpg'
import BannerSlider02 from '@/assets/images/home/slider/banner-02.jpg'
import BannerSlider03 from '@/assets/images/home/slider/banner-03.jpg'
import { SliderStyled } from './styled'
import { Link } from 'react-router-dom'
import AnimatedButton from '../animatedButton'

const listImageSlider = [BannerSlider01, BannerSlider02, BannerSlider03]

export default function Slider() {
  return (
    <SliderStyled>
      <Carousel autoplay autoplaySpeed={3000}>
        {listImageSlider.map((img, i) => (
          <div key={i}>
            <img src={img} alt='Banner Slider' />
          </div>
        ))}
      </Carousel>

      <div className='slider__content'>
        <span className='slider__content-logo'>Yen Yakiniku</span>
        <h1 className='slider__content-title'>
          Yen Yakiniku - Câu chuyện tạo nên thương hiệu
        </h1>
        <p className='slider__content-description'>
          Sau hơn 5 năm hoạt động, Yen Yakiniku đã trở thành một trong những nhà
          hàng buffet nướng Nhật Bản hàng đầu tại Đà Nẵng. Luôn theo đuổi một
          tôn chỉ duy nhất “mang ẩm thực Nhật Bản chuẩn chỉnh với mức giá hợp lý
          đến gần hơn với mọi người”, Yen Yakiniku đặt ra những yêu cầu kỹ lưỡng
          từ không gian, món ăn cho đến phong cách phục vụ.
        </p>
        <p className='slider__content-description'>
          Trải qua nhiều lần nâng cấp, Yen Yakiniku tự hào càng ngày càng mang
          đến cho các thực khách những trải nghiệm ẩm thực hoàn hảo hơn nữa. Hệ
          thống cơ sở đặt tại vị trí đắc địa với thiết kế như một Nhật Bản hiện
          đại thu nhỏ; thực đơn buffet nướng hơn 150 món; phục vụ chu đáo, tỉ mỉ
          từ khi khách bước vào cho tới khi ra về,… Yen Yakiniku mong muốn sẽ
          trở thành cái tên đầu tiên được nhắc đến khi khách hàng tìm kiếm một
          địa điểm thưởng thức buffet Nhật Bản.
        </p>

        <div className='slider__content-btns'>
          <AnimatedButton>ĐẶT BÀN NGAY</AnimatedButton>
          <AnimatedButton>
            <Link to='tel:+84903559447'>Hotline: 0903559447</Link>
          </AnimatedButton>
        </div>
      </div>
    </SliderStyled>
  )
}
