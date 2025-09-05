import { motion } from 'framer-motion'
import { Button } from 'antd'
import styled from 'styled-components'

const MotionButton = motion(Button)

const StyledMotionButton = styled(MotionButton)`
  &.ant-btn {
    transition: none;
  }
`

export default function AnimatedButton({
  children,
  whileHover = {
    scale: 1.1,
  },
  type = 'primary',
  shape = 'round',
  size = 'large',
  danger,
  ...rest
}) {
  return (
    <StyledMotionButton
      whileHover={whileHover}
      type={type}
      shape={shape}
      size={size}
      danger={danger}
      {...rest}
    >
      {children}
    </StyledMotionButton>
  )
}
