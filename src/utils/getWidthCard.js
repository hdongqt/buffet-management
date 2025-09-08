import { WIDTH_CARD_LOGIN, WIDTH_CARD_MODAL } from '@/constants/styleWidth'

export const getWidthCard = (screens, widthCard) => {
  const map = widthCard === 'modal' ? WIDTH_CARD_MODAL : WIDTH_CARD_LOGIN

  if (screens.lg) return map.LAPTOP
  if (screens.md) return map.TABLET
  if (screens.sm) return map.MOBILE
  if (screens.xs) return map.MOBILE_XS
  return map.PC
}
