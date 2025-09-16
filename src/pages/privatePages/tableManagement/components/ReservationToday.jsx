import React from 'react'
import dayjs from 'dayjs'
import { Col, Row, Typography } from 'antd'
import { UserOutlined } from '@ant-design/icons'

import { CommonUI } from '@/components/common'

import DATE_FORMAT from '@/constants/dateTimeFormat'

import { ReservationTodayStyle } from '../styled'
import { Space } from 'antd'
import { Flex } from 'antd'

const { Text } = Typography
const { CustomModal } = CommonUI

const ReservationToday = ({ data, setData }) => {
  const onCloseForm = () => {
    setData(null)
  }

  return (
    <CustomModal
      title={'Danh sách đặt bàn hôm nay'}
      open={!!data}
      onCancel={onCloseForm}
      footer={null}
    >
      <ReservationTodayStyle.Container>
        {data?.length > 0 ? (
          <>
            {data.map((reservation) => (
              <ReservationTodayStyle.ReservationCard
                key={reservation.id}
                size='small'
              >
                <Row align='middle' justify='space-between'>
                  <Col flex='auto'>
                    <ReservationTodayStyle.CardContent
                      direction='vertical'
                      size={4}
                    >
                      <ReservationTodayStyle.UserInfo>
                        <Space>
                          <ReservationTodayStyle.UserAvatar
                            icon={<UserOutlined />}
                            size={24}
                          />
                          <ReservationTodayStyle.UserName>
                            {reservation.fullname}
                          </ReservationTodayStyle.UserName>
                        </Space>
                        <Flex gap={8} align='center'>
                          <ReservationTodayStyle.TimeIcon />
                          <ReservationTodayStyle.TimeText>
                            {reservation?.reservedAt &&
                              dayjs(reservation.reservedAt).format(
                                DATE_FORMAT.DATE_TIME
                              )}
                          </ReservationTodayStyle.TimeText>
                        </Flex>
                      </ReservationTodayStyle.UserInfo>

                      <ReservationTodayStyle.InfoRow>
                        <ReservationTodayStyle.InfoItem>
                          <ReservationTodayStyle.PeopleIcon />
                          <Text>{reservation.numPeople} người</Text>
                        </ReservationTodayStyle.InfoItem>

                        <ReservationTodayStyle.InfoItem>
                          <ReservationTodayStyle.PhoneIcon />
                          <Text>{reservation.phone}</Text>
                        </ReservationTodayStyle.InfoItem>
                      </ReservationTodayStyle.InfoRow>

                      {reservation.note && (
                        <ReservationTodayStyle.NoteRow>
                          <ReservationTodayStyle.NoteIcon />
                          <ReservationTodayStyle.NoteText>
                            {reservation.note}
                          </ReservationTodayStyle.NoteText>
                        </ReservationTodayStyle.NoteRow>
                      )}
                    </ReservationTodayStyle.CardContent>
                  </Col>
                </Row>
              </ReservationTodayStyle.ReservationCard>
            ))}
          </>
        ) : (
          <ReservationTodayStyle.EmptyState description='Không có lịch hẹn nào hôm nay' />
        )}
      </ReservationTodayStyle.Container>
    </CustomModal>
  )
}

export default ReservationToday
