import {
  MobileOutlined,
  ClockCircleOutlined,
  ThunderboltOutlined,
  EyeOutlined,
} from '@ant-design/icons'

import { IntroQRStyles } from './styled'

const featureHero = [
  {
    icon: (
      <IntroQRStyles.FeatureIcon as={ThunderboltOutlined} color='#52c41a' />
    ),
    title: 'Đặt Món Nhanh Chóng',
    description:
      'Chỉ cần quét QR code trên bàn, bạn có thể xem menu và đặt món ngay lập tức mà không cần chờ phục vụ.',
  },
  {
    icon: <IntroQRStyles.FeatureIcon as={EyeOutlined} color='#18b3ed' />,
    title: 'Theo Dõi Đơn Hàng',
    description:
      'Khách có thể dễ dàng theo dõi trạng thái món ăn đã gọi ngay trên điện thoại.',
  },
  {
    icon: <IntroQRStyles.FeatureIcon as={MobileOutlined} color='#13d39d' />,
    title: 'Dễ Sử Dụng',
    description:
      'Giao diện thân thiện trên điện thoại, dễ dàng lựa chọn món ăn và tùy chỉnh theo sở thích.',
  },
  {
    icon: (
      <IntroQRStyles.FeatureIcon as={ClockCircleOutlined} color='#fa8c16' />
    ),
    title: 'Tiết Kiệm Thời Gian',
    description:
      'Không cần chờ đợi phục vụ, order trực tiếp từ bàn ăn, tiết kiệm tối đa thời gian của bạn.',
  },
]

export { featureHero }
