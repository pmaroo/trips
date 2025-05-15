"use client";

import { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

export default function WaveMorph() {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, {
    amount: 0.5, // framer-motion 전용
  });

  useEffect(() => {
    if (inView) {
      controls.start({ pathLength: 1 });
    }
  }, [inView, controls]);

  return (
    <>
      <motion.svg
        ref={ref}
        style={{ width: "100vw", rotate: "4deg" }}
        preserveAspectRatio="none"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 4 }}
        viewport={{ once: true, amount: 0.5 }}
      >
        <motion.path
          d="M-30 50 
         Q 50 0, 100 50
         T 200 50 
         T 300 50 
         T 400 50 
         T 500 50 
         T 600 50 
         T 700 50 
         T 800 50 
         T 900 50
         T 1000 50
         T 1100 50
         T 1200 50
         T 1300 50
         T 1400 50
         T 1500 50
         T 1600 50
         T 1700 50
         T 1800 50
         T 1900 50
         T 2000 50
         T 2100 50
         T 2200 50
         T 2300 50
         T 2400 50
         T 2500 50
         T 2600 50
         T 2700 50
         T 2800 50
         T 2900 50
         T 3000 50
      "
          stroke="#81CEDE"
          fill="transparent"
          opacity={0.3}
          strokeWidth={50}
          initial={{ pathLength: 0 }}
          animate={controls}
          transition={{ duration: 4, ease: "easeInOut" }}
        />
      </motion.svg>
      <motion.svg
        ref={ref}
        style={{ width: "100vw", rotate: "-5deg", margin: `-200px 0 0` }}
        preserveAspectRatio="none"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 4 }}
        viewport={{ once: true, amount: 0.5 }}
      >
        <motion.path
          d="M-30 50 
         Q 50 0, 100 50
         T 200 50 
         T 300 50 
         T 400 50 
         T 500 50 
         T 600 50 
         T 700 50 
         T 800 50 
         T 900 50
         T 1000 50
         T 1100 50
         T 1200 50
         T 1300 50
         T 1400 50
         T 1500 50
         T 1600 50
         T 1700 50
         T 1800 50
         T 1900 50
         T 2000 50
         T 2100 50
         T 2200 50
         T 2300 50
         T 2400 50
         T 2500 50
         T 2600 50
         T 2700 50
         T 2800 50
         T 2900 50
         T 3000 100
      "
          stroke="#72affe"
          fill="transparent"
          opacity={0.3}
          strokeWidth={50}
          initial={{ pathLength: 0 }}
          animate={controls}
          transition={{ duration: 4, ease: "easeInOut" }}
        />
      </motion.svg>
    </>
  );
}
