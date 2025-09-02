import { WIDTH_CARD } from '@/constants/styleWidth'

export const getWidthCard = (screens) => {
  if (screens.md) {
    return WIDTH_CARD.TABLET
  }
  if (screens.sm) {
    return WIDTH_CARD.MOBILE
  }
  if (screens.xs) {
    return WIDTH_CARD.MOBILE_XS
  }
  return WIDTH_CARD.PC
}
