import { motion } from 'framer-motion'
import { Button } from 'antd'

const MotionButton = motion(Button)

export default function AnimatedButton({
  children,
  whileHover = { scale: 1.2 },
  whileTap = { scale: 0.9 },
  type = 'primary',
  shape = 'round',
  size = 'large',
  ...rest
}) {
  return (
    <MotionButton
      whileHover={whileHover}
      whileTap={whileTap}
      type={type}
      shape={shape}
      size={size}
      danger
      {...rest}
    >
      {children}
    </MotionButton>
  )
}
