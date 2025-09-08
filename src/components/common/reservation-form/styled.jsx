import styled from 'styled-components'
import { theme } from '@/constants/theme'
import { Row } from 'antd'
import { HOME_RESERVATION } from '@/constants/images/homeUserImage'

const { breakpoints } = theme

const Reservation = {
  Wrapper: styled.div`
    padding: 40px 0;
    background: url('${HOME_RESERVATION.backgroundReservation}') no-repeat
      center/cover;
    width: 100%;
    min-height: 500px;
  `,

  Logo: styled.div`
    display: flex;
    justify-content: center;
    img {
      width: 100%;
      max-width: 300px;
    }
  `,

  Background: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
  `,

  FormBox: styled.div`
    background-color: #fff;
    padding: 40px;
    margin: 40px 20px;
    border-radius: 10px;
    width: 100%;
    max-width: 700px;
    display: flex;
    flex-direction: column;
    gap: 20px;

    @media (max-width: ${breakpoints.md}) {
      padding: 20px;
      button {
        width: 100%;
      }
    }
  `,

  Row: styled(Row)`
    @media (max-width: ${breakpoints.md}) {
      gap: 20px;
    }
  `,
}

export { Reservation }
