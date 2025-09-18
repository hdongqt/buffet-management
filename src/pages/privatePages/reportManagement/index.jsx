import { useEffect } from 'react'
import { Table, Statistic, Row, Col, Typography, Form, Spin } from 'antd'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts'
import dayjs from 'dayjs'
import {
  AppstoreOutlined,
  DeleteOutlined,
  HeatMapOutlined,
} from '@ant-design/icons'

import { FormItemControl } from '@/components/common'
import { CommonUI } from '@/components/common'

import { useReportManager } from '@/hooks'
import ReportStyled from './styled'

const { CustomButton, CustomDatePicker } = CommonUI
const COLORS = ['#ff4d4f', '#1890ff']

const ReportManager = () => {
  const {
    topTypeSelected,
    setTopTypeSelected,
    reports,
    loading,
    formik,
    startDate,
    endDate,
    onChangeDate,
    getReports,
    handleResetFilters,
    paymentData,
  } = useReportManager()

  useEffect(() => {
    getReports()
  }, [])

  const columns = [
    { title: 'STT', render: (_, __, index) => index + 1 },
    {
      title: 'Tên món',
      render: (_, record) => (
        <Typography.Text strong>{record.name}</Typography.Text>
      ),
    },
    { title: 'Số lượng bán', dataIndex: 'total_sold', key: 'total_sold' },
  ]

  return (
    <ReportStyled.Wrapper>
      <Form onFinish={formik.handleSubmit} layout='vertical'>
        <Row gutter={16}>
          <Col xs={24} md={8} lg={6}>
            <FormItemControl
              name='startDate'
              label='Ngày bắt đầu'
              formik={formik}
            >
              <CustomDatePicker
                placeholder='Ngày bắt đầu'
                value={startDate ? dayjs(startDate) : null}
                onChange={(value) => onChangeDate(value, 'startDate')}
              />
            </FormItemControl>
          </Col>
          <Col xs={24} md={8} lg={6}>
            <FormItemControl
              name='endDate'
              label='Ngày kết thúc'
              formik={formik}
            >
              <CustomDatePicker
                placeholder='Ngày kết thúc'
                value={endDate ? dayjs(endDate) : null}
                onChange={(value) => onChangeDate(value, 'endDate')}
              />
            </FormItemControl>
          </Col>
          <Col xs={24} md={8} lg={6}>
            <FormItemControl emptyLabel>
              <CustomButton
                onClick={handleResetFilters}
                icon={<DeleteOutlined />}
                size='large'
              >
                Xóa bộ lọc
              </CustomButton>
            </FormItemControl>
          </Col>
        </Row>
      </Form>

      <Spin spinning={loading}>
        <ReportStyled.RowSection gutter={[16, 16]}>
          <Col xs={24} md={12} lg={6}>
            <ReportStyled.StatisticCard className='revenue'>
              <Statistic
                title='Doanh thu'
                value={reports?.revenue}
                suffix='VND'
              />
            </ReportStyled.StatisticCard>
          </Col>

          <Col xs={24} md={12} lg={6}>
            <ReportStyled.StatisticCard className='orders'>
              <Statistic title='Số đơn hàng' value={reports?.totalOrders} />
            </ReportStyled.StatisticCard>
          </Col>

          <Col xs={24} md={12} lg={6}>
            <ReportStyled.StatisticCard className='unpaid'>
              <Statistic
                title='Chưa thanh toán'
                value={reports?.unpaidOrders}
              />
            </ReportStyled.StatisticCard>
          </Col>

          <Col xs={24} md={12} lg={6}>
            <ReportStyled.StatisticCard className='paid'>
              <Statistic title='Đã thanh toán' value={reports?.paidOrders} />
            </ReportStyled.StatisticCard>
          </Col>
        </ReportStyled.RowSection>

        <ReportStyled.RowSection gutter={16}>
          <Col xs={24} md={24} lg={12}>
            <ReportStyled.Card>
              <ReportStyled.SectionTitle level={4}>
                Doanh thu
              </ReportStyled.SectionTitle>
              <ResponsiveContainer width='100%' height={300}>
                <LineChart data={reports?.revenueByPeriod}>
                  <CartesianGrid strokeDasharray='3 3' />
                  <XAxis dataKey='period' />
                  <YAxis />
                  <Tooltip formatter={(v) => `${v.toLocaleString()} VND`} />
                  <Line
                    type='monotone'
                    dataKey='total'
                    label='Tổng doanh thu'
                    stroke='#1890ff'
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ReportStyled.Card>
          </Col>

          <Col xs={24} md={24} lg={12}>
            <ReportStyled.Card>
              <ReportStyled.SectionTitle level={4}>
                Tổng thanh toán theo phương thức
              </ReportStyled.SectionTitle>
              <ResponsiveContainer width='100%' height={200}>
                <PieChart>
                  <Pie
                    data={paymentData}
                    dataKey='value'
                    nameKey='name'
                    outerRadius={80}
                    label
                  >
                    {paymentData &&
                      paymentData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                  </Pie>
                  <Tooltip />
                  <Legend
                    verticalAlign='bottom'
                    align='center'
                    formatter={(value, entry, index) => (
                      <span
                        style={{
                          color: COLORS[index % COLORS.length],
                          fontWeight: 600,
                        }}
                      >
                        {value}
                      </span>
                    )}
                  />
                </PieChart>
              </ResponsiveContainer>
            </ReportStyled.Card>
          </Col>
        </ReportStyled.RowSection>

        <ReportStyled.Card title='Top món bán chạy'>
          <ReportStyled.Segmented
            options={[
              { label: 'Combo', value: 'combo', icon: <AppstoreOutlined /> },
              { label: 'Món lẻ', value: 'single', icon: <HeatMapOutlined /> },
            ]}
            value={topTypeSelected}
            onChange={setTopTypeSelected}
          />
          <Table
            columns={columns}
            dataSource={
              topTypeSelected === 'combo'
                ? reports?.topComboDishes
                : reports?.topSingleDishes
            }
            pagination={false}
            rowKey='name'
            loading={loading}
          />
        </ReportStyled.Card>
      </Spin>
    </ReportStyled.Wrapper>
  )
}

export default ReportManager
