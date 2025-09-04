import styled from 'styled-components'
import Background from '@/assets/images/home/common/background.jpg'
import Background02 from '@/assets/images/home/common/background-02.jpg'
import { theme } from '@/constants/theme'
const { breakpoints } = theme

export const HomeStyled = styled.div`
  .menu {
    position: relative;

    &__title {
      position: absolute;
      top: -5rem;
      left: 50%;
      transform: translateX(-50%);
      max-width: 300px;
    }

    &__banner {
      object-fit: cover;
    }

    &__button {
      position: absolute;
      bottom: 5%;
      left: 50%;
      transform: translateX(-50%);
    }
  }

  .introduce {
    background-image: url(${Background02});
    background-repeat: no-repeat;
    background-size: cover;
    padding: 4rem 0;
    &__content {
      display: flex;
      flex-direction: column;
      gap: 2rem;
      max-width: 800px;
      margin: 0 auto;
      align-items: center;
      padding: 5rem 0;
    }

    &__discount {
      text-align: center;
      font-weight: 700;
      background-color: var(--ant-main-primary-color);
      width: 100%;
      color: white;
      border-radius: 99rem;
      padding: 0.5rem 0;
    }
    &__banner img {
      max-width: 100%;
    }
  }

  .customer {
    text-align: center;
    background-image: url(${Background});
    background-repeat: no-repeat;
    background-size: cover;
    padding: 5rem 0;

    &__text {
      font-size: 1.8rem;
      padding: 2rem 0;
    }

    &__slider {
      display: flex;
      gap: 4rem;
      padding: 4rem 0;
      &-right {
        width: 50%;
      }

      &-left {
        width: 50%;
      }

      &-image {
        width: 100%;
        object-fit: cover;
      }
    }
  }

  .blog {
    background-image: url('${Background}');
    background-repeat: no-repeat;
    background-size: cover;
    padding: 4rem 0;
    &__logo {
      display: flex;
      justify-content: center;
      img {
        max-width: 30rem;
      }
    }
    &__content-list {
      padding-left: 3rem;
      font-weight: 700;
      color: var(--ant-main-primary-color);

      &-item li,
      a {
        color: var(--ant-main-primary-color);
        font-size: 1.6rem;
      }
    }
  }

  @media (max-width: ${breakpoints.md}) {
    .menu {
      &__title {
        max-width: 200px;
        top: -3rem;
      }

      &__banner {
        max-height: 400px;
        width: 100%;
      }
    }
    .introduce {
      padding: 0 2rem;
      &__discount h3 {
        font-size: 2rem;
        padding: 0 1rem;
      }
    }

    .customer {
      &__logo {
        max-width: 300px;
      }

      &__slider {
        flex-direction: column;

        &-left {
          width: 100%;
        }

        &-right {
          width: 100%;
        }
      }
    }

    .blog {
      &__logo {
        img {
          max-width: 200px;
        }
      }
      &__content {
        text-align: center;
        padding: 2rem 0;
        &-list {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 1rem 0;
        }
      }
    }
  }

  @media (max-width: ${breakpoints.xs}) {
    .menu {
      &__title {
        max-width: 150px;
        top: -2rem;
      }
    }

    .introduce {
      &__discount h3 {
        font-size: 1.6rem;
      }
    }

    .customer {
      &__logo {
        max-width: 250px;
      }
    }
  }
`
