import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import './Hero.css';

const TAGLINES = [
  'WHERE CHAOS BECOMES CINEMA',
  'FRAME BY FRAME, STORY BY STORY',
  'CRAFTING DISORDER INTO ART',
  'EVERY SCENE, DELIBERATELY WILD',
];

export default function Hero() {
  const [taglineIdx, setTaglineIdx] = useState(0);
  const [frameCount, setFrameCount] = useState(0);
  const [showTitle, setShowTitle] = useState(false);
  const [flickerDone, setFlickerDone] = useState(false);
  const intervalRef = useRef(null);

  // Film counter
  useEffect(() => {
    let count = 0;
    const timer = setInterval(() => {
      count++;
      setFrameCount(count);
      if (count >= 24) {
        clearInterval(timer);
        setFlickerDone(true);
        setTimeout(() => setShowTitle(true), 300);
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

  return (
    <section className="hero">
      {/* Scan lines */}
      <div className="hero__scanlines" aria-hidden="true" />

      {/* Film leader countdown */}
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

      {/* Main hero content */}
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

          {/* Main title */}
          <div className="hero__title-wrap">
            <motion.h1
              className="hero__title-team"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              TEAM
            </motion.h1>

            <div className="hero__title-cine-wrap">
              <motion.span
                className="hero__title-cine"
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                CINE
              </motion.span>
              <motion.span
                className="hero__title-chaos"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                CHAOS
              </motion.span>
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

          {/* Film strip bottom bar */}
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