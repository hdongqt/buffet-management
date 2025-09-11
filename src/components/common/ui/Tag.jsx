import styled from 'styled-components'
import { Tag } from 'antd'

const TagStyled = styled(Tag)`
  text-transform: capitalize;
`

export default function CustomTag({ size = 'large', ...props }) {
  return <TagStyled size={size} {...props} />
}
