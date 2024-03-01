export const slideInTopVariants = {
  hidden: { y: '100%', opacity: 0, scale: 0.95 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      delay: i * 0.1,
      duration: 0.7,
    },
  }),
}

export const slideInBottomVariants = {
  hidden: { y: 200, opacity: 0, scale: 0.95 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      delay: i * 0.1,
      duration: 0.7,
    },
  }),
}

export const slideInLeftVariants = {
  hidden: { x: -100, opacity: 0, scale: 0.95 },
  visible: (i: number) => ({
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      delay: i * 0.1,
      duration: 0.7,
    },
  }),
}

export const slideInRightVariants = {
  hidden: { x: 100, opacity: 0, scale: 0.95 },
  visible: (i: number) => ({
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      delay: i * 0.1,
      duration: 0.7,
    },
  }),
}

export const containerVariants = {
  hidden: { scale: 0.8, opacity: 0, y: 50 },
  visible: {
    scale: 1.05,
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 10,
      duration: 0.8,
    },
  },
}

export const menuVariants = {
  open: {
    x: 0,
    opacity: 1,
    transition: {
      x: { stiffness: 1000, velocity: 100 },
    },
  },
  closed: {
    x: '100%',
    opacity: 0,
    transition: {
      x: { stiffness: 1000 },
    },
  },
}
