import styled from 'styled-components'
import { theme } from '@/constants/theme'
import { HOME_BACKGROUND } from '@/constants/images/homeUserImage'

const { breakpoints } = theme

const Price = {
  Wrapper: styled.section`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    padding: 120px 20px;
    background-image: url(${HOME_BACKGROUND.backgroundHome});
    background-repeat: no-repeat;
    background-size: cover;
    object-fit: cover;
    width: 100%;
    min-height: 500px;

    @media (max-width: ${breakpoints.md}) {
      grid-template-columns: repeat(2, 1fr);
      padding: 60px 20px;
    }
  `,

  Item: styled.img`
    width: 100%;
    max-width: 100%;
    display: block;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.3s ease;

    &:hover {
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
    }
  `,
}

export { Price }
