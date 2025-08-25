import React from 'react';
import { motion } from 'framer-motion';

const AnimatedSection = ({ children, delay = 0 }) => {
  const sectionVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10,
        delay,
      },
    },
  };

  return (
    <motion.div
      variants={sectionVariants}
      initial="hidden"
      animate="visible"
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;