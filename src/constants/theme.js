export const theme = {
  colors: {
    textPrimaryColor: '#000000',
    mainPrimaryColor: '#FF0000',
    mainSecondaryColor: '#D52031',
    white: '#FFFFFF',
  },
  breakpoints: {
    xs: '480px',
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px',
    xxl: '1600px',
  },
  animations: {
    fadeDropJump: {
      hidden: { opacity: 0, y: -100, scale: 0.5 },
      visible: {
        opacity: 1,
        y: [-120, 20, 0],
        scale: [0.6, 0.95, 1],
        transition: {
          duration: 0.9,
          ease: 'easeOut',
        },
      },
    },

    fadeVisible: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { duration: 0.6, ease: 'easeOut' },
      },
    },

    fadeInUp: {
      hidden: { opacity: 0, y: 40 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: 'easeOut' },
      },
    },

    fadeDown: {
      hidden: { opacity: 0, y: -40 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: 'easeOut' },
      },
    },

    fadeRightLeft: {
      hidden: { opacity: 0, x: -80 },
      visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.9, ease: 'easeOut' },
      },
    },

    fadeLeftRight: {
      hidden: { opacity: 0, x: 80 },
      visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.9, ease: 'easeOut' },
      },
    },

    fadeTopRight: {
      hidden: { opacity: 0, x: -120, y: 120 },
      visible: {
        opacity: 1,
        x: 0,
        y: 0,
        transition: { duration: 1, ease: 'easeOut' },
      },
    },
  },
}
