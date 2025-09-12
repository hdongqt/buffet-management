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
  `,

  ItemDescription: styled.p`
    font-size: 12px;
    color: #666;
    margin: 0 0 12px 0;
    line-height: 1.4;
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

  Quantity: styled.span`
    margin-bottom: 0 !important;
    font-size: 16px;
    font-weight: 600;
  `,
}

export { MenuGrid, DishItemStyles }
