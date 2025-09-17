import React from 'react'
import styled from 'styled-components'
import { Tag, Space, Typography } from 'antd'

import { CommonUI } from '@/components/common'

import useGuestCallStaff from '@/hooks/useGuestCallStaff'
import { useDisabledButton } from '@/hooks'

const { CustomButton, CustomTextArea } = CommonUI

const CallStaffPage = () => {
  const {
    customMessage,
    actionLoading,
    suggestions,
    onChangeMessage,
    handleAddSuggestion,
    handleSubmit,
  } = useGuestCallStaff()

  const { disabled: disabledButton, onClick } = useDisabledButton(
    handleSubmit,
    20000,
    'guestCallStaffDisabled'
  )

  return (
    <Container>
      <Typography.Title level={3}>Gọi nhân viên</Typography.Title>
      <Desc>Chọn nhanh hoặc nhập nội dung yêu cầu của bạn</Desc>

      <Space wrap>
        {suggestions.map((sug) => (
          <LargeTag
            key={sug}
            color='blue'
            onClick={() => handleAddSuggestion(sug)}
          >
            {sug}
          </LargeTag>
        ))}
      </Space>
      <CustomTextArea
        rows={4}
        value={customMessage}
        onChange={onChangeMessage}
        placeholder='VD: Cần thêm đũa, hỏi về món ăn...'
      />

      <CustomButton
        type='primary'
        block
        loading={actionLoading}
        size='large'
        disabled={disabledButton}
        onClick={onClick}
        style={{ marginTop: 16 }}
      >
        {disabledButton
          ? 'Sakura đến đây, vui lòng đợi tí nhé'
          : 'Gọi nhân viên'}
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

const LargeTag = styled(Tag)`
  font-size: 14px;
  padding: 6px 12px;
  border-radius: 8px;
  cursor: pointer;
  margin-bottom: 8px;
`
