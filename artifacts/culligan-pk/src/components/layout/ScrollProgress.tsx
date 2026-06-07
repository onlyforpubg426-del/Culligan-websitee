import { useScroll, useSpring, motion } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX, transformOrigin: "0%" }}
      className="fixed top-0 left-0 right-0 z-[9999] h-[3px] bg-gradient-to-r from-sky-400 via-primary to-blue-600 shadow-[0_0_8px_rgba(26,111,212,0.6)]"
    />
  );
}
