export const pageVariants = {
  initial: {
    opacity: 0.99,
    x: "-100vw",
  },
  in: {
    opacity: 1,
    x: 0,
  },
  out: {
    zIndex: -100,
    opacity: 0.99,
  }
};

export const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 1,
  delay: 0.3,
};

export const pageStyle = {
  position: "absolute",
};