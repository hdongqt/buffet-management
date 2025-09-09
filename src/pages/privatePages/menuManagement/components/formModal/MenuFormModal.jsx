import React, { useEffect } from 'react'
import { Grid, Radio, Typography, Empty, Tag } from 'antd'

import { MENU_STATUS_OPTIONS } from '@/constants/options'

import {
  CustomInput,
  CustomSelect,
  CustomTextArea,
} from '@/components/common/ui'
import { FormItemControl } from '@/components/common'
import UpdateImage from '@/components/common/updateImage'

import useMenuManagement from '@/hooks/useMenuManagement'
import useMenuForm from '@/hooks/useMenuForm'

import {
  StyledModal,
  FieldGrid,
  FormPanel,
  ImagePanel,
  Section,
  SectionHeader,
  SelectedList,
  StyledInputNumber,
} from '@/pages/privatePages/menuManagement/components/formModal/styled'
import { getWidthCard } from '@/utils/getWidthCard'
import { formatNumber, parseNumber } from '@/utils/format'

const { useBreakpoint } = Grid

const MenuFormModal = ({ open, onClose, initialValues }) => {
  const { actionLoading } = useMenuManagement()
  const {
    formik,
    foodItemList,
    selectedComboItems,
    foodMap,
    onChangeFormItem,
  } = useMenuForm({
    initialValues,
    onClose,
  })

  const screens = useBreakpoint()
  const widthCard = getWidthCard(screens, 'modal')

  useEffect(() => {
    if (!open) formik.resetForm()
  }, [open])

  return (
    <StyledModal.Wrap
      title={initialValues ? 'Chỉnh sửa món ăn' : 'Thêm món ăn'}
      open={open}
      onOk={formik.handleSubmit}
      onCancel={onClose}
      okText='Lưu'
      confirmLoading={actionLoading}
      width={widthCard}
    >
      <StyledModal.Grid>
        <ImagePanel>
          <Section>
            <SectionHeader>
              <h5>Ảnh món ăn</h5>
              <p>JPEG/PNG/WebP • Tối đa 3MB</p>
            </SectionHeader>
            <UpdateImage
              name='imageUrl'
              value={formik.values.imageUrl}
              onChange={(url) => onChangeFormItem('imageUrl', url)}
              onBlur={formik.handleBlur}
              helperText='Kéo thả hoặc chọn ảnh từ thiết bị'
            />
          </Section>

          <Section>
            <SectionHeader>
              <h5>Món đã chọn trong combo</h5>
              <p>{selectedComboItems.length} món</p>
            </SectionHeader>

            {selectedComboItems.length === 0 ? (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description='Chưa chọn món nào'
              />
            ) : (
              <SelectedList>
                {selectedComboItems.map((id) => {
                  const label = foodMap(id) || `#${id}`
                  return (
                    <Tag
                      key={id}
                      color='blue'
                      closable
                      onClose={(e) => {
                        e.preventDefault()
                        onChangeFormItem(
                          'comboItems',
                          selectedComboItems.filter((item) => item !== id)
                        )
                      }}
                    >
                      {label}
                    </Tag>
                  )
                })}
              </SelectedList>
            )}
          </Section>
        </ImagePanel>

        <FormPanel>
          <Section>
            <SectionHeader>
              <h5>Thông tin cơ bản</h5>
              <p>Điền đầy đủ giúp khách hiểu món ăn rõ hơn</p>
            </SectionHeader>
            <FormItemControl label='Tên món ăn' name='name' formik={formik}>
              <CustomInput
                name='name'
                placeholder='Ví dụ: Sushi cá hồi'
                value={formik.values.name}
                onChange={(e) => onChangeFormItem('name', e.target.value)}
                onBlur={formik.handleBlur}
                allowClear
              />
            </FormItemControl>

            <FormItemControl label='Mô tả' name='description' formik={formik}>
              <CustomTextArea
                name='description'
                placeholder='Ngắn gọn, súc tích: nguyên liệu chính, mùi vị, cách chế biến...'
                value={formik.values.description}
                onChange={(e) =>
                  onChangeFormItem('description', e.target.value)
                }
                onBlur={formik.handleBlur}
                autoSize={{ minRows: 3, maxRows: 6 }}
                showCount
                maxLength={255}
              />
            </FormItemControl>
          </Section>

          <Section>
            <SectionHeader>
              <h5>Giá & Trạng thái</h5>
              <p>Quy định mức giá và trạng thái món ăn</p>
            </SectionHeader>

            <FieldGrid>
              <FormItemControl label='Giá (VND)' name='price' formik={formik}>
                <StyledInputNumber
                  name='price'
                  placeholder='Nhập giá'
                  value={formik.values.price}
                  min={0}
                  size='large'
                  onChange={(val) => onChangeFormItem('price', val)}
                  formatter={formatNumber}
                  parser={parseNumber}
                />
              </FormItemControl>

              <FormItemControl label='Trạng thái' name='status' formik={formik}>
                <Radio.Group
                  name='status'
                  value={formik.values.status}
                  onChange={(e) => onChangeFormItem('status', e.target.value)}
                  options={MENU_STATUS_OPTIONS}
                  optionType='button'
                  buttonStyle='solid'
                />
              </FormItemControl>
            </FieldGrid>
          </Section>

          <Section>
            <SectionHeader>
              <h5>Combo</h5>
              <p>Chọn món để ghép combo</p>
            </SectionHeader>
            <FormItemControl
              label='Món trong combo'
              name='comboItems'
              formik={formik}
            >
              <CustomSelect
                name='comboItems'
                mode='multiple'
                placeholder='Chọn món trong combo'
                value={formik.values.comboItems || []}
                onChange={(value) => onChangeFormItem('comboItems', value)}
                options={foodItemList}
                allowClear
                maxTagCount={1}
              />
            </FormItemControl>
            <Typography.Paragraph type='secondary'>
              Danh sách món đã chọn được hiển thị ở panel bên trái.
            </Typography.Paragraph>
          </Section>
        </FormPanel>
      </StyledModal.Grid>
    </StyledModal.Wrap>
  )
}

export default MenuFormModal
