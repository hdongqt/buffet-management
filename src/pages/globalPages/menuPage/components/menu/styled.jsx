import styled from 'styled-components'
import { Flex } from 'antd'
import { IMAGES_MENU } from '@/constants/images/menuUserImage'

const Menu = {
  Section: styled.section`
    position: relative;
    z-index: 1;
    padding: 80px 20px 20px;

    display: flex;
    flex-direction: column;
    gap: 40px;

    &::before {
      content: '';
      position: absolute;
      inset: 0;
      background-image: url(${IMAGES_MENU.bgMenu});
      background-position: 50% -10%;
      background-size: 110%;
      z-index: -1;
    }
  `,

  Flex: styled(Flex)`
    height: 100%;
  `,

  Image: styled.img`
    width: 100%;
    height: auto;
  `,
}

export { Menu }
