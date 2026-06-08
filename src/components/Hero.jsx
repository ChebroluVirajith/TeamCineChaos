import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Hero.css';

const TAGLINES = [
  'WHERE CHAOS BECOMES CINEMA',
  'FRAME BY FRAME, STORY BY STORY',
  'CRAFTING DISORDER INTO ART',
  'EVERY SCENE, DELIBERATELY WILD',
];

// Letters for the splice animation
const CINE_LETTERS  = ['C','I','N','E'];
const CHAOS_LETTERS = ['C','H','A','O','S'];

export default function Hero() {
  const [taglineIdx, setTaglineIdx]   = useState(0);
  const [frameCount, setFrameCount]   = useState(0);
  const [flickerDone, setFlickerDone] = useState(false);
  const [showBeam, setShowBeam]       = useState(false);
  const [showTitle, setShowTitle]     = useState(false);
  const [splicePhase, setSplicePhase] = useState('hidden'); // hidden → split → snap → settled
  const intervalRef = useRef(null);

  // ── Phase 1: film leader countdown (0–960ms) ──────────────────────────────
  useEffect(() => {
    let count = 0;
    const timer = setInterval(() => {
      count++;
      setFrameCount(count);
      if (count >= 24) {
        clearInterval(timer);
        setFlickerDone(true);
        // ── Phase 2: projector beam appears ──────────────────────────────
        setTimeout(() => setShowBeam(true), 100);
        // ── Phase 3: title content mounts ────────────────────────────────
        setTimeout(() => setShowTitle(true), 600);
        // ── Phase 4: splice animation sequence ───────────────────────────
        setTimeout(() => setSplicePhase('split'),   900);
        setTimeout(() => setSplicePhase('snap'),   1400);
        setTimeout(() => setSplicePhase('settled'),1700);
      }
    }, 40);
    return () => clearInterval(timer);
  }, []);

  // Tagline rotation
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTaglineIdx(prev => (prev + 1) % TAGLINES.length);
    }, 3500);
    return () => clearInterval(intervalRef.current);
  }, []);

  // Per-letter splice offsets (random-ish, deterministic)
  const cineOffsets  = [-38, -22, 26, 42];
  const chaosOffsets = [44, -28, 18, -40, 30];

  const getLetterStyle = (offsets, i) => {
    if (splicePhase === 'hidden')  return { opacity: 0 };
    if (splicePhase === 'split')   return { opacity: 1, x: offsets[i], y: i % 2 === 0 ? -6 : 6 };
    if (splicePhase === 'snap')    return { opacity: 1, x: offsets[i] * 0.08, y: 0 };
    return { opacity: 1, x: 0, y: 0 };
  };

  return (
    <section className="hero">
      {/* Scan lines */}
      <div className="hero__scanlines" aria-hidden="true" />

      {/* ── Projector beam ── */}
      <AnimatePresence>
        {showBeam && (
          <motion.div
            className="hero__beam"
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <div className="hero__beam-shaft" />
            {[...Array(7)].map((_, i) => (
              <motion.div
                key={i}
                className="hero__beam-mote"
                style={{ left: `${44 + i * 2}%` }}
                animate={{ y: [0, -20, 5, -12, 0], opacity: [0.3, 1, 0.2, 0.8, 0.3] }}
                transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Film leader countdown ── */}
      {!flickerDone && (
        <div className="hero__leader" aria-hidden="true">
          <div className="hero__leader-circle">
            <span className="hero__leader-num">{Math.max(0, 8 - Math.floor(frameCount / 3))}</span>
          </div>
          <div className="hero__leader-cross" />
          <div className="hero__leader-corners">
            <span /><span /><span /><span />
          </div>
        </div>
      )}

      {/* ── Main hero content ── */}
      {showTitle && (
        <div className="hero__content">
          {/* Top label */}
          <motion.div
            className="hero__label"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="hero__label-line" />
            <span>EST. 2024</span>
            <span className="hero__label-line" />
            <span>INDEPENDENT FILM COLLECTIVE</span>
            <span className="hero__label-line" />
          </motion.div>

          {/* TEAM */}
          <div className="hero__title-wrap">
            <motion.h1
              className="hero__title-team"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              TEAM
            </motion.h1>

            {/* CINE CHAOS — splice animation */}
            <div className="hero__title-cine-wrap">
              {/* CINE */}
              <span className="hero__splice-word">
                {CINE_LETTERS.map((letter, i) => (
                  <motion.span
                    key={i}
                    className="hero__title-cine hero__splice-letter"
                    animate={getLetterStyle(cineOffsets, i)}
                    transition={{
                      duration: splicePhase === 'split' ? 0.25 : splicePhase === 'snap' ? 0.18 : 0.35,
                      ease: splicePhase === 'snap' ? [0.34, 1.56, 0.64, 1] : [0.16, 1, 0.3, 1],
                    }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </span>

              {/* CHAOS */}
              <span className="hero__splice-word">
                {CHAOS_LETTERS.map((letter, i) => (
                  <motion.span
                    key={i}
                    className="hero__title-chaos hero__splice-letter"
                    animate={getLetterStyle(chaosOffsets, i)}
                    transition={{
                      duration: splicePhase === 'split' ? 0.25 : splicePhase === 'snap' ? 0.18 : 0.35,
                      ease: splicePhase === 'snap' ? [0.34, 1.56, 0.64, 1] : [0.16, 1, 0.3, 1],
                      delay: splicePhase === 'split' ? i * 0.03 : 0,
                    }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </span>
            </div>
          </div>

          {/* Tagline */}
          <motion.div
            className="hero__tagline-wrap"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <motion.p
              key={taglineIdx}
              className="hero__tagline"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.5 }}
            >
              {TAGLINES[taglineIdx]}
            </motion.p>
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            className="hero__cta"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.7 }}
          >
            <a href="/films" className="hero__btn hero__btn--primary">
              <span>View Our Films</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <a href="/contact" className="hero__btn hero__btn--secondary">
              Work With Us
            </a>
          </motion.div>

          {/* Film strip */}
          <motion.div
            className="hero__filmstrip"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.6 }}
            aria-hidden="true"
          >
            {[...Array(18)].map((_, i) => (
              <div key={i} className="hero__filmstrip-frame" />
            ))}
          </motion.div>

          {/* Frame counter */}
          <motion.div
            className="hero__framecounter"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            aria-hidden="true"
          >
            <span className="hero__framecounter-text">FRAME 001 / 24FPS / APERTURE 2.8</span>
          </motion.div>
        </div>
      )}

      {/* Scroll cue */}
      {showTitle && (
        <motion.div
          className="hero__scroll"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          aria-label="Scroll down"
        >
          <span className="hero__scroll-text">SCROLL</span>
          <motion.div
            className="hero__scroll-line"
            animate={{ scaleY: [1, 0.3, 1] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
          />
        </motion.div>
      )}
    </section>
  );
}