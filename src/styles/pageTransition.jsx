export let pageVariants = {
  initial: {
    opacity: 0.99,
    position: "fixed",
    clipPath: `circle(0px at ${window.innerWidth / 2}px ${window.innerHeight / 2}px)`,
  },
  in: {
    opacity: 1,
    clipPath: `circle(${Math.max(window.innerWidth, window.innerHeight)}px at ${window.innerWidth / 2}px ${window.innerHeight / 2}px)`,
    position: "absolute",
    transitionEnd: {
      clipPath: "none",
    }
  },
  out: {
    opacity: 0.99,
  }
};

export const pageTransition = {
  ease: [0.94, 0.06, 0.88, 0.45],
  duration: 1,
  delay: 0.5,
};

export const pageStyle = {
  position: "absolute",
};