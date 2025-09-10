import { motion } from 'framer-motion'
import { Button } from 'antd'
import styled from 'styled-components'

const MotionButton = motion(Button)

const StyledMotionButton = styled(MotionButton)`
  width: 100%;
  &.ant-btn {
    transition: none;
  }
`

export default function AnimatedButton({
  children,
  isWaving = false,
  whileHover = { scale: 1.1 },
  type = 'primary',
  shape = 'round',
  size = 'large',
  danger,
  ...rest
}) {
  const animateProps = isWaving
    ? {
        scale: [1, 1.05, 1, 1.05, 1],
        transition: {
          duration: 1,
          repeat: Infinity,
        },
      }
    : undefined

  return (
    <StyledMotionButton
      animate={animateProps}
      whileHover={!isWaving ? whileHover : undefined}
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
