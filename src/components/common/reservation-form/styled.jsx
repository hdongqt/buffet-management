import styled from 'styled-components'
import bgImage from '@/assets/images/home/reservation/background.jpg'
import { theme } from '@/constants/theme'
const { breakpoints } = theme

export const ReservationFormStyled = styled.div`
  .reservation {
    padding: 4rem 0;
    background: url('${bgImage}') no-repeat center/cover;
    width: 100%;
    min-height: 50rem;

    &__logo {
      display: flex;
      justify-content: center;
      img {
        width: 100%;
        max-width: 30rem;
      }
    }

    &__background {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    &__form {
      background-color: #fff;
      padding: 4rem;
      margin: 4rem 0;
      border-radius: 1rem;
      width: 100%;
      max-width: 70rem;
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }

    &__picker,
    &__select,
    &__textarea {
      width: 100%;
    }

    &__submit {
      margin-top: 1rem;
      font-size: 1.6rem;
      font-weight: 600;
      height: 4.4rem;
    }
  }

  @media (max-width: ${breakpoints.md}) {
    .reservation {
      padding: 2rem 1rem;

      &__form {
        padding: 2rem;

        &-title {
          font-size: 2.8rem;
          text-align: center;
        }
      }

      &__row {
        gap: 2rem;
      }

      &__submit {
        width: 100%;
      }
    }
  }

  @media (max-width: ${breakpoints.xs}) {
    .reservation {
      &__form {
        padding: 1.5rem;
      }

      &__form-title {
        font-size: 1.8rem;
      }
    }
  }
`
