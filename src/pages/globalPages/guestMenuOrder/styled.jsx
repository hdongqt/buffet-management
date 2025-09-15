import { Tag } from 'antd'
import { Flex } from 'antd'
import { Tabs } from 'antd'
import { Card, Typography } from 'antd'
import styled from 'styled-components'

const { Text } = Typography

const MenuGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
  padding: 16px 0;

  @media (max-width: 767px) {
    grid-template-columns: repeat(2, 1fr);
  }
`

const GuestMenuOrderStyles = {
  MenuContainer: styled.div`
    padding: 0 10px;
  `,
  TagStyle: styled(Tabs)`
    .ant-tabs-tab-btn {
      font-size: 16px;
      font-weight: 500;
    }
  `,
}

const DishItemStyles = {
  StyledImageWrapper: styled.div`
    width: 100%;
    height: 110px;
    overflow: hidden;

    .ant-image {
      width: 100%;
      height: 100%;
    }

    .ant-image-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  `,

  MenuItemCard: styled(Card)`
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s ease;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
    }

    .ant-card-body {
      padding: 0;
    }
  `,

  ItemContent: styled.div`
    padding: 12px;
  `,

  ItemName: styled.h4`
    font-size: 16px;
    font-weight: 600;
    margin: 0 0 4px 0;
    color: #333;

    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    min-height: 32px;
  `,

  ItemDescription: styled.p`
    font-size: 12px;
    color: #666;
    margin: 0 0 12px 0;
    line-height: 1.4;

    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    min-height: 38px;
  `,

  ItemFooter: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,

  ItemPrice: styled(Text)`
    &.ant-typography {
      font-size: 16px;
      font-weight: 500;
      color: ${({ $oldPrice }) =>
        $oldPrice ? '#666' : 'var(--ant-main-primary-color)'};
      text-decoration: ${({ $oldPrice }) =>
        $oldPrice ? 'line-through' : 'none'};
    }
  `,

  AddCartContainer: styled(Flex)`
    background: ${({ $hasQuantity }) =>
      $hasQuantity ? 'rgb(255, 255, 255)' : 'transparent'};
    position: absolute;
    top: 12px;
    padding: 2px;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    right: 12px;
  `,

  Quantity: styled.span`
    margin-bottom: 0 !important;
    font-size: 16px;
    font-weight: 600;
  `,
}

const ExtraMenuStyles = {
  Controls: styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 12px;
    margin-bottom: 12px;

    @media (min-width: 768px) {
      grid-template-columns: 1fr;
    }
  `,

  CategoryWrapper: styled.div`
    display: flex;
    gap: 8px;
    overflow-x: auto;
    white-space: nowrap;
    padding: 4px 2px 6px 2px;
    margin-bottom: 8px;

    @media (min-width: 1024px) {
      scrollbar-width: thin;
      &::-webkit-scrollbar {
        height: 6px;
      }
      &::-webkit-scrollbar-thumb {
        background: #d9d9d9;
        border-radius: 3px;
      }
    }

    @media (max-width: 1023px) {
      -ms-overflow-style: none;
      scrollbar-width: none;
      &::-webkit-scrollbar {
        display: none;
      }
      -webkit-overflow-scrolling: touch;
    }
  `,

  StyledCheckableTag: styled(Tag.CheckableTag)`
    font-size: 14px;
    font-weight: 500;
    padding: 6px 12px;
    border-radius: 999px;
    cursor: pointer;
    transition: all 0.2s ease;
    border: 1px solid #f0f0f0;
    background: #fff;

    &.ant-tag:hover {
      border-color: #fc1010;
      color: #fc1010;
      background: #fff;
    }

    &.ant-tag-checkable-checked {
      background: var(--ant-main-primary-color);
      color: #fff;
      border-color: var(--ant-main-primary-color);
    }
  `,
}

export { MenuGrid, GuestMenuOrderStyles, DishItemStyles, ExtraMenuStyles }
