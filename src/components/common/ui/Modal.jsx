import { Modal } from 'antd'

export default function CustomModal({
  title,
  children,
  cancelText = 'Hủy',
  ...props
}) {
  return (
    <Modal title={title} cancelText={cancelText} {...props}>
      {children}
    </Modal>
  )
}
