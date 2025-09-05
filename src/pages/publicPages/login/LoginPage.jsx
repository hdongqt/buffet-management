import { Button, Grid, Typography, Input } from 'antd'
import { LockOutlined, MailOutlined } from '@ant-design/icons'
import { getWidthCard } from '@/utils/getWidthCard'
import useLogIn from '@/hooks/useLogin'
import FormItemControl from '@/components/common/formItemControl'
import { Login } from './styled'

const { useBreakpoint } = Grid
const { Text, Title } = Typography

const LoginPage = () => {
  const screens = useBreakpoint()
  const widthCard = getWidthCard(screens)

  const { formik, loading, onChangeFormItem } = useLogIn()

  return (
    <Login.Card $width={widthCard}>
      <Title>Đăng nhập</Title>
      <Text>Chào mừng bạn đặng nhập với Sakura Buffet!</Text>

      <Login.Form onFinish={formik.handleSubmit} labelCol={{ span: 6 }}>
        <FormItemControl name='username' formik={formik}>
          <Input
            name='username'
            value={formik.values.username}
            type='text'
            size='large'
            prefix={<MailOutlined />}
            placeholder='Tên đăng nhập'
            onChange={(event) => onChangeFormItem('username', event)}
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
            placeholder='Mật khẩu'
            onChange={(event) => onChangeFormItem('password', event)}
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
          {loading ? 'Xác nhận...' : 'Đăng nhập'}
        </Button>
      </Login.Form>
    </Login.Card>
  )
}

export default LoginPage
