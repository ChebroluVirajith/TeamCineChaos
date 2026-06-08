import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './Manifesto.css';

const words = [
  'We', 'don\'t', 'make', 'polished', 'films.',
  'We', 'make', 'honest', 'ones.'
];

export default function Manifesto() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-15%' });

  return (
    <section className="manifesto" ref={ref}>
      {/* Section label */}
      <motion.div
        className="manifesto__label"
        initial={{ opacity: 0, x: -20 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <span className="manifesto__label-line" />
        <span>Our Belief</span>
      </motion.div>

      {/* Big quote */}
      <div className="manifesto__quote-wrap">
        <motion.span
          className="manifesto__quote-mark"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 0.12 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          aria-hidden="true"
        >
          "
        </motion.span>
        <h2 className="manifesto__quote">
          {words.map((word, i) => (
            <motion.span
              key={i}
              className="manifesto__word"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
            >
              {word}{' '}
            </motion.span>
          ))}
        </h2>
      </div>

      {/* Body text */}
      <div className="manifesto__body">
        {[
          'Born from a shared obsession with storytelling, Team Cine Chaos emerged as a collective of passionate filmmakers who believe that raw emotion always outweighs perfect execution.',
          'We are directors, cinematographers, editors, and dreamers — united by the conviction that every story deserves to be told with authenticity and fearlessness.',
        ].map((para, i) => (
          <motion.p
            key={i}
            className="manifesto__para"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.9 + i * 0.2 }}
          >
            {para}
          </motion.p>
        ))}
      </div>

      {/* Stats row */}
      <motion.div
        className="manifesto__stats"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 1.4 }}
      >
        {[
          { num: '12+', label: 'Films Produced' },
          { num: '8',   label: 'Crew Members' },
          { num: '5',   label: 'Festivals' },
          { num: '3',   label: 'Awards Won' },
        ].map(({ num, label }) => (
          <div key={label} className="manifesto__stat">
            <span className="manifesto__stat-num">{num}</span>
            <span className="manifesto__stat-label">{label}</span>
          </div>
        ))}
      </motion.div>
    </section>
  );
}