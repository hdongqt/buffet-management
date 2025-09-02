import styled from 'styled-components'
import { color } from '@/utils/getColorTheme'

export const HeaderStyled = styled.header`
  position: relative;

  .header__nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 500px;
    width: 100%;
    gap: 2rem;
    font-weight: 700;

    position: fixed;
    top: 2rem;
    left: 50%;
    padding: 1.5rem 4rem;
    border-radius: 1.5rem;

    background-color: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    z-index: 10;

    a {
      position: relative;
      color: ${color.foreground};
      text-decoration: none;
      font-size: 1.6rem;
      transition: color 0.3s ease;

      &::after {
        content: '';
        position: absolute;
        bottom: -4px;
        left: 0;
        width: 0;
        height: 2px;
        background-color: ${color.primary};
        transition: all 0.3s ease-in-out;
      }

      &:hover {
        color: ${color.primary};
        &::after {
          width: 100%;
        }
      }

      &.active {
        color: ${color.primary};
        font-weight: 600;
      }
    }
  }

  @media (max-width: 1024px) {
    .header__nav {
      max-width: calc(100% - 4rem);
      left: 0;
      transform: none;
      justify-content: center;
      gap: 3rem;
      padding: 1rem 4rem;
      margin: 0 2rem;
    }
  }
`
