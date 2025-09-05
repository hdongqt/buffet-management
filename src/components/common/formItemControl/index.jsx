import { Form } from 'antd'
import Typography from 'antd/es/typography/Typography'
import React from 'react'

const FormItemControl = ({
  children,
  name,
  help,
  validateStatus,
  formik,
  label,
  ...props
}) => {
  const getStatus = (nameValue) => {
    if (!formik || !name) return undefined
    return formik.touched[nameValue] && formik.errors[nameValue]
      ? 'error'
      : undefined
  }

  const getHelp = (nameValue) => {
    if (!formik || !name) return undefined
    return formik.touched[nameValue] && formik.errors[nameValue]
      ? formik.errors[nameValue]
      : undefined
  }

  return (
    <Form.Item
      help={help || getHelp(name)}
      label={<Typography.Text strong>{label ?? ''}</Typography.Text>}
      validateStatus={validateStatus || getStatus(name)}
      {...props}
    >
      {children}
    </Form.Item>
  )
}

export default FormItemControl
