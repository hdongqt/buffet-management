import { Switch } from 'antd'

export default function CustomSwitch({ size = 'large', ...props }) {
  return <Switch size={size} {...props} />
}
