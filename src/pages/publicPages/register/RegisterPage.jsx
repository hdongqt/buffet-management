import { StyleCard, StyleForm } from './styled'
import { Button, Grid, Typography, Form, Input } from 'antd'
import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons'
import { getWidthCard } from '@/utils/getWidthCard'
import useRegister from '@/hooks/useRegister'
import FormItemControl from '@/components/common/formItemControl'
import { useNavigate } from 'react-router-dom'

const { useBreakpoint } = Grid
const { Text, Title, Link } = Typography

const RegisterPage = () => {
  const navigate = useNavigate()
  const screens = useBreakpoint()
  const widthCard = getWidthCard(screens)

  const { formik, loading } = useRegister()

  return (
    <StyleCard $width={widthCard}>
      <Title>Sign up</Title>
      <Text>Join us! Create an account to get started.</Text>

      <StyleForm onFinish={formik.handleSubmit} labelCol={{ span: 6 }}>
        <FormItemControl name='fullname' formik={formik}>
          <Input
            name='fullname'
            value={formik.values.fullname}
            size='large'
            prefix={<UserOutlined />}
            placeholder='Full name'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </FormItemControl>
        <FormItemControl name='email' formik={formik}>
          <Input
            name='email'
            value={formik.values.email}
            type='email'
            size='large'
            prefix={<MailOutlined />}
            placeholder='Email'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </FormItemControl>
        <FormItemControl name='password' formik={formik}>
          <Input.Password
            name='password'
            value={formik.values.password}
            type='password'
            size='large'
            prefix={ <LockOutlined />}
            placeholder='Password'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </FormItemControl>
        <FormItemControl name='confirmPassword' formik={formik}>
          <Input.Password
            name='confirmPassword'
            value={formik.values.confirmPassword}
            type='confirmPassword'
            size='large'
            prefix={ <LockOutlined />}
            placeholder='Confirm Password'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </FormItemControl>

        <Button
          htmlType='submit'
          type='primary'
          disabled={loading || !formik.dirty}
          loading={loading}
          block
          size='medium'
        >
          {loading ? 'Submitting...' : 'Sign up'}
        </Button>
      </StyleForm>
      <div>
        <Text>Already have an account?</Text>
        <Link onClick={() => navigate('/login')}> Sign in</Link>
      </div>
    </StyleCard>
  )
}

export default RegisterPage
