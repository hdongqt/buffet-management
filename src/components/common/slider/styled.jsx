import styled from 'styled-components'
import { theme } from '@/constants/theme'
const { breakpoints } = theme

export const SliderStyled = styled.div`
  position: relative;
  z-index: 1;

  .slider__content {
    position: absolute;
    z-index: 2;
    top: 10rem;
    left: 10rem;
    max-width: 500px;
    background-color: rgba(255, 255, 255, 0.8);
    padding: 4rem;
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    color: var(--ant-text-primary-color);

    &-title {
      color: var(--ant-main-primary-color);
      text-align: left;
      font-size: 3.2rem;
    }

    &-description {
      text-align: left;
      font-size: 1.8rem;
    }

    &-btns {
      display: flex;
      justify-content: center;
      gap: 2rem;
      align-items: center;

      button {
        flex-grow: 1;
      }
    }

    /* Tablet */
    @media (max-width: ${breakpoints.md}) {
      top: 5rem;
      left: 50%;
      transform: translateX(-50%);
      padding: 2rem;
      width: 90%;
    }

    /* Mobile */
    @media (max-width: ${breakpoints.xs}) {
      top: 2rem;
      font-size: 1.2rem;

      &-title {
        font-size: 2.4rem;
      }

      &-description {
        font-size: 1.4rem;
      }

      &-btns {
        flex-direction: column;

        button {
          width: 100%;
        }
      }
    }
  }
`
