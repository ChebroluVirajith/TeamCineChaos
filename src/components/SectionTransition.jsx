import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './SectionTransition.css';

export default function SectionTransition() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-5%' });

  return (
    <div className="section-transition" ref={ref} aria-hidden="true">
      {/* Main light leak sweep line */}
      <motion.div
        className="section-transition__line"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={inView ? { scaleX: 1, opacity: 1 } : {}}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Bright flare that travels across */}
      <motion.div
        className="section-transition__flare"
        initial={{ left: '-10%', opacity: 0 }}
        animate={inView ? { left: '110%', opacity: [0, 1, 1, 0] } : {}}
        transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1], delay: 0.05 }}
      />

      {/* Faint secondary line above */}
      <motion.div
        className="section-transition__line section-transition__line--secondary"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={inView ? { scaleX: 1, opacity: 1 } : {}}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      />

      {/* Film edge tick marks */}
      <motion.div
        className="section-transition__ticks"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.4, delay: 0.5 }}
      >
        {[...Array(8)].map((_, i) => (
          <span key={i} className="section-transition__tick" />
        ))}
      </motion.div>
    </div>
  );
}