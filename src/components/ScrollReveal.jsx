import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

/**
 * ScrollReveal — wraps children with a film-burn wipe entrance.
 *
 * Props:
 *   delay     — stagger delay in seconds (default 0)
 *   direction — 'up' | 'left' | 'right' (default 'up')
 *   distance  — px to travel (default 32)
 *   duration  — animation duration (default 0.75)
 *   once      — animate only once (default true)
 *   className — pass-through className
 */
export default function ScrollReveal({
  children,
  delay = 0,
  direction = 'up',
  distance = 32,
  duration = 0.75,
  once = true,
  className = '',
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: '-8%' });

  const offsets = {
    up:    { y: distance,  x: 0 },
    left:  { y: 0, x: -distance },
    right: { y: 0, x: distance },
  };

  const initial = { opacity: 0, ...offsets[direction] };
  const animate = inView ? { opacity: 1, x: 0, y: 0 } : initial;

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={initial}
      animate={animate}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}