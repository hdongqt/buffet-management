import { Form } from 'antd'
import React from 'react'

const FormItemControl = ({
  children,
  name,
  help,
  validateStatus,
  formik,
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
      validateStatus={validateStatus || getStatus(name)}
      {...props}
    >
      {children}
    </Form.Item>
  )
}

export default FormItemControl
