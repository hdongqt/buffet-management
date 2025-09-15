import styled from 'styled-components'
import { Typography } from 'antd'

import { theme } from '@/constants/theme'
import { Flex } from 'antd'

const { Text, Title } = Typography
const { breakpoints } = theme

const GuestOrderStyles = {
  OrderContainer: styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 24px;

    @media (min-width: ${breakpoints.md}) {
      flex-direction: row;
      gap: 32px;
    }
  `,

  CartSection: styled.div`
    flex: 1;
    background: #fff;
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    height: fit-content;

    @media (min-width: ${breakpoints.md}) {
      position: sticky;
      top: 20px;
      max-height: calc(100vh - 40px);
      overflow-y: auto;
    }
  `,

  OrderedSection: styled.div`
    flex: 1;
    background: #fff;
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  `,

  CartItems: styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-bottom: 20px;
  `,

  CartItem: styled.div`
    display: flex;
    gap: 12px;
    padding: 12px;
    border: 1px solid #f0f0f0;
    border-radius: 8px;
    background: #fafafa;
    transition: all 0.2s ease;

    &:hover {
      border-color: #d9d9d9;
      background: #f5f5f5;
    }
  `,

  OrderedItems: styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
  `,

  OrderedItem: styled.div`
    display: flex;
    gap: 12px;
    padding: 16px;
    border: 1px solid #f0f0f0;
    border-radius: 8px;
    background: #fff;
    transition: all 0.2s ease;

    &:hover {
      border-color: #d9d9d9;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
  `,

  ItemImage: styled.div`
    width: 80px;
    height: 80px;
    border-radius: 8px;
    overflow: hidden;
    flex-shrink: 0;

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

  ItemInfo: styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 4px;
  `,

  ItemName: styled.h4`
    font-size: 16px;
    font-weight: 600;
    margin: 0;
    color: #333;
    line-height: 1.4;
  `,

  ItemCategory: styled.span`
    font-size: 12px;
    color: #666;
    background: #f0f0f0;
    padding: 2px 8px;
    border-radius: 4px;
    width: fit-content;
  `,

  ItemPrice: styled(Text)`
    &.ant-typography {
      font-size: 16px;
      font-weight: 600;
      color: var(--ant-main-primary-color);
      margin: 0;
    }
  `,

  ItemQuantity: styled.span`
    font-size: 14px;
    color: #666;
    font-weight: 500;
  `,

  ItemActions: styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    align-items: flex-end;
  `,

  QuantityControls: styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
  `,

  QuantityText: styled.span`
    font-size: 16px;
    font-weight: 600;
    min-width: 24px;
    text-align: center;
  `,

  CartSummary: styled.div`
    margin-top: 20px;
  `,

  TotalAmount: styled(Text)`
    &.ant-typography {
      font-size: 20px;
      font-weight: 700;
      color: var(--ant-main-primary-color);
      margin: 0;
    }
  `,

  ItemStatus: styled.div`
    display: flex;
    margin-top: 8px;
    gap: 8px;
    align-items: center;
    justify-content: space-between;
    min-width: 120px;
  `,

  StatusBadge: styled.span`
    padding: 4px 12px;
    border-radius: 16px;
    font-size: 12px;
    font-weight: 500;
    color: #fff;
    background-color: ${(props) => props.color};
    text-align: center;
    white-space: nowrap;
  `,

  OrderTime: styled.span`
    font-size: 12px;
    color: #666;
    text-align: center;
  `,

  ComboItem: styled.div`
    border: 1px solid #f0f0f0;
    border-radius: 12px;
    background: #fff;
    margin-bottom: 16px;
    overflow: hidden;
    transition: all 0.2s ease;

    &:hover {
      border-color: #d9d9d9;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
  `,
  ComboHeaderContainer: styled.div`
    background: #fafafa;
    border-bottom: 1px solid #f0f0f0;
    padding: 16px;
  `,

  ComboHeader: styled.div`
    display: flex;
    gap: 12px;
  `,

  ComboDishes: styled.div`
    padding: 16px;
    background: #fff;
  `,

  ComboDishesTitle: styled.h5`
    font-size: 14px;
    font-weight: 600;
    color: #333;
    margin: 0 0 12px 0;
  `,

  ComboDishItem: styled.div`
    display: flex;
    gap: 12px;
    padding: 8px;
    border: 1px solid #f0f0f0;
    border-radius: 8px;
    background: #fafafa;
    margin-bottom: 8px;

    &:last-child {
      margin-bottom: 0;
    }
  `,

  ComboDishImage: styled.div`
    width: 50px;
    height: 50px;
    border-radius: 6px;
    overflow: hidden;
    flex-shrink: 0;

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

  ComboDishInfo: styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 4px;
  `,

  ComboDishName: styled.span`
    font-size: 14px;
    font-weight: 500;
    color: #333;
  `,

  OrderSummary: styled.div`
    background: #f0f8ff;
    padding: 16px;
    border-radius: 8px;
    margin-top: 20px;
    border: 1px solid #d6e4ff;
  `,

  SummaryHeader: styled(Flex)`
    margin-bottom: 16px;
    justify-content: space-between;
    align-items: center;
  `,

  SummaryTitle: styled(Title)`
    &.ant-typography {
      margin: 0 !important;
      color: #1890ff;
    }
  `,
}

export { GuestOrderStyles }
