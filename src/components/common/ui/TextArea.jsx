import { Input } from 'antd'
import styled from 'styled-components'

const TextAreaStyled = styled(Input.TextArea)`
  width: 100%;
  resize: none;
`

export default function CustomTextArea({ rows = 5, ...props }) {
  return <TextAreaStyled rows={rows} {...props} />
}
