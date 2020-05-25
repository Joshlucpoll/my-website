export const pageVariants = {
  initial: {
    opacity: 0,
    x: "-100vw",
  },
  in: {
    opacity: 1,
    x: 0,
  },
  out: {
    opacity: 0,
    x: "100vw",
  }
};

export const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 2,
  delay: 0.5,
};

export const pageStyle = {
  position: "absolute"
};