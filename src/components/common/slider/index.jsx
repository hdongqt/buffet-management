import { Carousel } from 'antd'
import { HOME_SLIDER } from '@/constants/images/homeUserImage'
import { Slider } from './styled'
import { Link } from 'react-router-dom'
import { AnimatedButton } from '@/components/common/'

export default function SliderSection() {
  return (
    <Slider.Wrapper>
      <Carousel autoplay autoplaySpeed={3000}>
        {Object.values(HOME_SLIDER).map((img, i) => (
          <div key={i}>
            <img src={img} alt={`Banner Slider ${i + 1}`} />
          </div>
        ))}
      </Carousel>
      <Slider.Content>
        <Slider.Logo>Sakura Buffet</Slider.Logo>

        <Slider.Title>
          Sakura Buffet - Câu chuyện tạo nên thương hiệu
        </Slider.Title>

        <Slider.Description>
          Sau hơn 5 năm hoạt động, Sakura Buffet đã trở thành một trong những
          nhà hàng buffet nướng Nhật Bản hàng đầu tại Huế. Luôn theo đuổi một
          tôn chỉ duy nhất “mang ẩm thực Nhật Bản chuẩn chỉnh với mức giá hợp lý
          đến gần hơn với mọi người”, Sakura Buffet đặt ra những yêu cầu kỹ
          lưỡng từ không gian, món ăn cho đến phong cách phục vụ.
        </Slider.Description>

        <Slider.Description>
          Trải qua nhiều lần nâng cấp, Sakura Buffet tự hào càng ngày càng mang
          đến cho các thực khách những trải nghiệm ẩm thực hoàn hảo hơn nữa. Hệ
          thống cơ sở đặt tại vị trí đắc địa với thiết kế như một Nhật Bản hiện
          đại thu nhỏ; thực đơn buffet nướng hơn 150 món; phục vụ chu đáo, tỉ mỉ
          từ khi khách bước vào cho tới khi ra về,… Sakura Buffet mong muốn sẽ
          trở thành cái tên đầu tiên được nhắc đến khi khách hàng tìm kiếm một
          địa điểm thưởng thức buffet Nhật Bản.
        </Slider.Description>

        <Slider.Buttons>
          <AnimatedButton type='primary' danger shape='round'>
            ĐẶT BÀN NGAY
          </AnimatedButton>
          <AnimatedButton type='primary' shape='round' danger>
            <Link to='tel:+84903559447'>Hotline: 0903559447</Link>
          </AnimatedButton>
        </Slider.Buttons>
      </Slider.Content>
    </Slider.Wrapper>
  )
}
