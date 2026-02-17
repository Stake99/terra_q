// Shared Framer Motion animation variants

export const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const scaleOnHover = {
  rest: { scale: 1 },
  hover: { scale: 1.1 }
};
