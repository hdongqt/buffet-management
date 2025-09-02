import { StyleCard, StyleForm } from '@/pages/publicPages/register/styled'
import { Button, Grid, Typography, Form, Input } from 'antd'
import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons'
import { getWidthCard } from '@/utils/getWidthCard'
import useLogIn from '@/hooks/useLogin'
import FormItemControl from '@/components/common/formItemControl'

const { useBreakpoint } = Grid
const { Text, Title, Link } = Typography

const LoginPage = () => {
  const screens = useBreakpoint()
  const widthCard = getWidthCard(screens)

  const { formik, loading } = useLogIn()

  return (
    <StyleCard $width={widthCard}>
      <Title>Sign In</Title>
      <Text>Welcome back to Sakura Buffet!</Text>

      <StyleForm onFinish={formik.handleSubmit} labelCol={{ span: 6 }}>
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
            prefix={<LockOutlined />}
            placeholder='Password'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </FormItemControl>

        <Button
          htmlType='submit'
          type='primary'
          loading={loading}
          block
          size='medium'
        >
          {loading ? 'Submitting...' : 'Sign in'}
        </Button>
      </StyleForm>
      {/* <div>
        <Text>Don't have an account?</Text>
        <Link onClick={() => navigate('/register')}> Sign up now</Link>
      </div> */}
    </StyleCard>
  )
}

export default LoginPage
