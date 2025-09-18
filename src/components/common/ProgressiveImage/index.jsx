import { useState, useEffect, forwardRef } from 'react'
import styled from 'styled-components'

// use forwardRef to motion can workk
const ProgressiveImage = forwardRef(
  ({ src, placeholder, alt, className }, ref) => {
    const [currentSrc, setCurrentSrc] = useState(placeholder)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
      const img = new Image()
      img.src = src
      img.onload = () => {
        setCurrentSrc(src)
        setLoading(false)
      }
    }, [src])

    return (
      <ProgressiveImageStyle
        ref={ref}
        src={currentSrc}
        className={className}
        alt={alt}
        $loading={loading}
      />
    )
  }
)

const ProgressiveImageStyle = styled.img`
  filter: ${(props) => (props.$loading ? 'blur(1px)' : 'none')};
  transition: ${(props) =>
    props.$loading ? 'filter 0.5s ease-in-out' : 'none'};
`

export default ProgressiveImage
