import styled, { keyframes } from 'styled-components'
import { theme } from '@/constants/theme'
import { NavLink } from 'react-router-dom'
const { breakpoints } = theme

const slideDown = keyframes`
  from {
     transform: translateY(-60px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`

const HeaderStyled = styled.header`
  &.header {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    padding: 10px 26px;
    position: fixed;
    background-color: transparent;
    transition: all 0.2s linear;
    z-index: 10;

    &.scroll-large {
      background-color: #292626aa;
    }

    & .header__logo {
      img {
        width: 16rem;
      }
    }

    @media screen and (max-width: ${breakpoints.md}) {
      align-items: flex-start;
      padding: 10px 14px;
      &.mobile-open {
        background-color: #00000071;
      }
    }

    & .header__toggle {
      padding: 6px 8px;
      border-radius: 5px;
      outline: none;
      border: none;
      display: none;
      @media screen and (max-width: ${breakpoints.md}) {
        display: block;
      }
      &-icon {
        font-size: 2rem;
      }
    }
  }

  & .header__nav {
    @media screen and (max-width: ${breakpoints.md}) {
      width: 100%;
      position: absolute;
      inset: 0;
      left: 0;
      z-index: 9999;
      width: 100%;
      z-index: 10;
      top: 55px;
    }
  }

  & .header__nav-list {
    display: flex;
    list-style: none;
    gap: 12px;
    margin: 0;
    transform: translateY(0);
    padding: 0;
    @media screen and (max-width: ${breakpoints.md}) {
      visibility: hidden;
      transform: translateY(0);
      flex-direction: column;
      transition: 0.2s linear;
      gap: 4px;
      opacity: 0;
      width: 100%;
      background-color: #fff;
      &.mobile-open {
        visibility: visible;
        animation: ${slideDown} 0.2s linear;
        opacity: 1;
      }
    }
  }
`

const NavLinkStyled = styled(NavLink)`
  text-decoration: none;
  font-weight: 500;
  font-size: 1.8rem;
  transition: color 0.3s;
  padding: 8px 17px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--ant-white);
  transition: 0.2s linear;

  &:hover {
    color: var(--ant-white);
    background-color: var(--ant-main-primary-color);
  }
  &.active {
    background-color: var(--ant-main-primary-color);
  }

  @media screen and (max-width: ${breakpoints.md}) {
    color: #333;
    padding: 10px 0px;
    font-size: 1.6rem;
    &.active {
      color: var(--ant-white);
    }
  }
`

export { HeaderStyled, NavLinkStyled }
