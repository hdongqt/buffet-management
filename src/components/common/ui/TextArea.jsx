import { Input } from 'antd'
import styled from 'styled-components'

const CustomTextArea = styled(Input.TextArea)`
  width: 100%;
  resize: none;
`

export default function TextAreaStyled({ rows = 5, ...props }) {
  return <CustomTextArea rows={rows} {...props} />
}
