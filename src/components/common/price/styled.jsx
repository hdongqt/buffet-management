import styled from 'styled-components'
import Background from '@/assets/images/home/common/background.jpg'
import { theme } from '@/constants/theme'
const { breakpoints } = theme

export const PriceStyled = styled.div`
  .price {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 2rem;
    padding: 12rem 2rem;
    background-image: url('${Background}');
    object-fit: cover;
    width: 100%;
    background-repeat: no-repeat;
    background-size: cover;
    min-height: 50rem;

    &__item {
      max-width: 100%;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }
  }

  @media (max-width: ${breakpoints.md}) {
    .price {
      grid-template-columns: repeat(2, 1fr);
      padding: 6rem 2rem;
    }
  }
`
