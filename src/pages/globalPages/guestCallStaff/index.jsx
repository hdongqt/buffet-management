import React, { useState } from 'react'
import styled from 'styled-components'
import { Button, Input, Tag, Space } from 'antd'
import { Typography } from 'antd'
import { CustomButton } from '@/components/common/ui'

const { TextArea } = Input

const CallStaffPage = () => {
  const [customMessage, setCustomMessage] = useState('')

  const suggestions = [
    'Bát đũa',
    'Thanh toán',
    'Dọn bàn',
    'Thêm nước',
    'Tư vấn thực đơn',
  ]

  const handleAddSuggestion = (text) => {
    setCustomMessage((prev) => (prev ? `${prev}, ${text}` : text))
  }

  const handleSubmit = () => {}

  return (
    <Container>
      <Typography.Title level={3}>Gọi nhân viên</Typography.Title>
      <Desc>Chọn nhanh hoặc nhập nội dung yêu cầu của bạn</Desc>

      <Space wrap>
        {suggestions.map((sug) => (
          <Tag
            key={sug}
            color='blue'
            style={{ cursor: 'pointer' }}
            onClick={() => handleAddSuggestion(sug)}
          >
            {sug}
          </Tag>
        ))}
      </Space>

      <TextArea
        rows={4}
        value={customMessage}
        onChange={(e) => setCustomMessage(e.target.value)}
        placeholder='VD: Cần thêm đũa, muốn đổi bàn, hỏi về món ăn...'
        style={{ marginTop: 16 }}
      />

      <CustomButton
        type='primary'
        block
        size='large'
        onClick={handleSubmit}
        style={{ marginTop: 16 }}
      >
        Gửi yêu cầu
      </CustomButton>
    </Container>
  )
}

export default CallStaffPage

const Container = styled.div`
  padding: 24px;
`

const Desc = styled.p`
  color: #666;
  font-size: 16px;
  margin-bottom: 12px;
`
