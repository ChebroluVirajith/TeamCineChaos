import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import './Manifesto.css';

const words = [
  'We', 'don\'t', 'make', 'polished', 'films.',
  'We', 'make', 'honest', 'ones.'
];

const STATS = [
  { target: 12, suffix: '+', label: 'Films Produced' },
  { target: 8,  suffix: '',  label: 'Crew Members' },
  { target: 5,  suffix: '',  label: 'Festivals' },
  { target: 3,  suffix: '',  label: 'Awards Won' },
];

// Single digit reel — scrolls through 0–9 and stops on `digit`
function DigitReel({ digit, delay = 0, inView }) {
  const DIGITS = ['0','1','2','3','4','5','6','7','8','9'];
  const CELL_HEIGHT = 56; // px — must match CSS
  const targetIndex = parseInt(digit, 10);
  // Spin a full 2 loops then land on target
  const finalY = -((20 + targetIndex) * CELL_HEIGHT);

  return (
    <span className="slot__reel-window" aria-hidden="true">
      <motion.span
        className="slot__reel-strip"
        initial={{ y: 0 }}
        animate={inView ? { y: finalY } : { y: 0 }}
        transition={{
          duration: 1.1,
          delay,
          ease: [0.25, 0.1, 0.15, 1],
        }}
      >
        {/* Three copies so we can spin 2 full loops */}
        {[...Array(3)].map((_, copy) =>
          DIGITS.map((d, i) => (
            <span key={`${copy}-${i}`} className="slot__digit">
              {d}
            </span>
          ))
        )}
      </motion.span>
    </span>
  );
}

// Splits a number into individual digit reels + optional suffix
function SlotMachine({ target, suffix, inView, delay = 0 }) {
  const digits = String(target).split('');

  return (
    <span className="slot__number">
      {digits.map((d, i) => (
        <DigitReel
          key={i}
          digit={d}
          inView={inView}
          delay={delay + i * 0.12}
        />
      ))}
      {suffix && (
        <motion.span
          className="slot__suffix"
          initial={{ opacity: 0, y: 8 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.3, delay: delay + digits.length * 0.12 + 0.9 }}
        >
          {suffix}
        </motion.span>
      )}
    </span>
  );
}

export default function Manifesto() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: '-15%' });
  const [cycle, setCycle] = useState(0);

  // Every time inView turns true, bump cycle so slot machines remount fresh
  useEffect(() => {
    if (inView) setCycle(c => c + 1);
  }, [inView]);

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
        transition={{ duration: 0.6, delay: 1.2 }}
      >
        {STATS.map(({ target, suffix, label }, i) => (
          <div key={label} className="manifesto__stat">
            <span className="manifesto__stat-num">
              <SlotMachine key={`${label}-${cycle}`} target={target} suffix={suffix} inView={inView} delay={1.4 + i * 0.15} />
            </span>
            <span className="manifesto__stat-label">{label}</span>
          </div>
        ))}
      </motion.div>
    </section>
  );
}