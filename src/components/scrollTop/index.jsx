import { VerticalAlignTopOutlined } from '@ant-design/icons'
import { CustomButton } from '../common/ui'
import { useScroll } from '@/hooks/useScroll'
import styled from 'styled-components'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const ScrollTop = () => {
  const { pathname } = useLocation()
  const isShowScrollTopBtn = useScroll(300)

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    scrollToTop()
  }, [pathname])

  if (!isShowScrollTopBtn) return null

  return (
    <StyledScrollTop shape='circle' size='large' onClick={scrollToTop}>
      <StyledScrollTopIcon />
    </StyledScrollTop>
  )
}

export default ScrollTop

const StyledScrollTop = styled(CustomButton)`
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 100;
  width: 48px;
  height: 48px;
  border-radius: 50%;
`

const StyledScrollTopIcon = styled(VerticalAlignTopOutlined)`
  font-size: 22px;
  padding: 4px;
`
