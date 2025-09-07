import styled from 'styled-components'
import { RESERVATION_HERO_BANNER } from '@/constants/images/reservationUserImage'

const Reservation = {
  HeroSection: styled.div`
    background-image: url(${RESERVATION_HERO_BANNER.reservationHeroBanner});
    height: 200px;
    width: 100%;
    background-size: cover;
    background-position: center;
  `,
}

export { Reservation }
