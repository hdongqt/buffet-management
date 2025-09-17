import React, { useState, useRef, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { Upload, Image, Typography, Tooltip } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'

import { showMessage } from '@/sagas/appMessage/appMessageSlice'
import { UPLOAD_IMAGE_API } from '@/services/image'

import { CustomButton } from '@/components/common/ui'

import {
  EmptyState,
  PreviewState,
  StyledInput,
  StyledSpace,
  StyledSpin,
  StyledUploadOutlined,
} from '@/components/common/updateImage/styled'
import { useEffect } from 'react'

const { Text } = Typography

const UpdateImage = ({
  open,
  name = 'imageUrl',
  value,
  onChange,
  onBlur,
  maxSizeMB = 5,
  helperText = 'JPEG/PNG/WebP, tối đa 5MB.',
}) => {
  const dispatch = useDispatch()

  const [uploading, setUploading] = useState(false)
  const [imageLoading, setImageLoading] = useState(false)
  const [preview, setPreview] = useState(null)
  const inputRef = useRef(null)

  const accept = 'image/png,image/jpeg,image/jpg,image/webp'
  const hasImage = Boolean(value)

  useEffect(() => {
    if (value) setImageLoading(true)
  }, [value])

  useEffect(() => {
    if (!open) {
      setPreview(null)
      setUploading(false)
      if (inputRef.current) inputRef.current.value = ''
    }
  }, [open])

  const handleChange = (newValue) => {
    if (onChange) {
      onChange(newValue)
    }
  }

  const validateFile = (file) => {
    const isImage = file.type.startsWith('image/')
    if (!isImage) {
      dispatch(showMessage.error('Chỉ hỗ trợ file ảnh'))
      return false
    }
    const isLtMax = file.size / 1024 / 1024 < maxSizeMB
    if (!isLtMax) {
      dispatch(showMessage.error(`Dung lượng ảnh phải nhỏ hơn ${maxSizeMB}MB`))
      return false
    }
    return true
  }

  const handleUpload = async (file) => {
    if (!validateFile(file)) return
    setUploading(true)

    try {
      const { publicUrl } = await UPLOAD_IMAGE_API.post(file)
      if (publicUrl) {
        handleChange(publicUrl)
        dispatch(showMessage.success('Tải ảnh thành công'))
      } else {
        dispatch(showMessage.error('Không lấy được đường dẫn ảnh'))
        setUploading(false)
      }
    } catch (err) {
      dispatch(showMessage.error('Tải ảnh thất bại, vui lòng thử lại'))
      setUploading(false)
    } finally {
      if (inputRef.current) inputRef.current.value = ''
    }
  }

  const handleInputChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onloadend = () => setPreview(reader.result)
    reader.readAsDataURL(file)

    handleUpload(file)
  }

  const handleDeleteImage = () => {
    handleChange('')
    setPreview(null)
    if (inputRef.current) inputRef.current.value = ''
  }

  const draggerProps = useMemo(
    () => ({
      name,
      multiple: false,
      accept,
      showUploadList: false,
      beforeUpload: (file) => {
        const reader = new FileReader()
        reader.onloadend = () => setPreview(reader.result)
        reader.readAsDataURL(file)

        handleUpload(file)
        return Upload.LIST_IGNORE
      },
      disabled: uploading,
    }),
    [name, accept, uploading]
  )

  return (
    <StyledSpace direction='vertical' size={8}>
      <PreviewState.Wrap>
        <StyledSpin spinning={uploading || imageLoading} tip='Đang tải ảnh...'>
          {hasImage ? (
            <Image
              key={value}
              src={uploading && preview ? preview : value}
              onLoad={() => {
                setUploading(false)
                setImageLoading(false)
              }}
              preview={{ mask: 'Xem ảnh' }}
            />
          ) : (
            <EmptyState.Wrap>
              <Upload.Dragger {...draggerProps}>
                <EmptyState.Space direction='vertical' align='center' size={8}>
                  <StyledUploadOutlined />
                  <Text strong>Kéo thả ảnh vào đây</Text>
                  <Text type='secondary'>hoặc bấm để chọn file</Text>
                  <Text type='secondary'>{helperText}</Text>
                </EmptyState.Space>
              </Upload.Dragger>
            </EmptyState.Wrap>
          )}
        </StyledSpin>

        {hasImage && (
          <PreviewState.Actions>
            <Tooltip title='Xóa ảnh'>
              <CustomButton
                size='small'
                danger
                icon={<DeleteOutlined />}
                onClick={handleDeleteImage}
              >
                Xóa
              </CustomButton>
            </Tooltip>
          </PreviewState.Actions>
        )}

        <StyledInput
          ref={inputRef}
          type='file'
          accept={accept}
          onChange={handleInputChange}
          onBlur={onBlur}
        />
      </PreviewState.Wrap>
    </StyledSpace>
  )
}

export default UpdateImage
