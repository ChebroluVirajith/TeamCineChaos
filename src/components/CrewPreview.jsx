import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './CrewPreview.css';

const chief = {
  name: 'Sri Harsha Nihanth',
  title: 'Chief of Team Cine Chaos',
  role: 'Director & Editor',
  initial: 'SHN',
  photo: null, // swap with: require('../assets/chief.jpg')
};

export default function CrewPreview() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });

  return (
    <section className="crew" ref={ref}>

      {/* Section header */}
      <div className="crew__header">
        <motion.div
          className="crew__label"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          <span className="crew__label-line" />
          <span>The Chief</span>
        </motion.div>
        <motion.a
          href="/crew"
          className="crew__view-all"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Meet the Full Crew →
        </motion.a>
      </div>

      {/* Two-column row */}
      <div className="crew__row">

        {/* Portrait left */}
        <motion.div
          className="crew__portrait"
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {chief.photo ? (
            <img src={chief.photo} alt={chief.name} className="crew__photo-img" />
          ) : (
            <div className="crew__photo-placeholder" aria-hidden="true">
              <div className="crew__photo-lines" />
              <span className="crew__initial">{chief.initial}</span>
              <span className="crew__photo-sub">Photo coming soon</span>
            </div>
          )}
          <div className="crew__corner crew__corner--tl" aria-hidden="true" />
          <div className="crew__corner crew__corner--tr" aria-hidden="true" />
          <div className="crew__corner crew__corner--bl" aria-hidden="true" />
          <div className="crew__corner crew__corner--br" aria-hidden="true" />
        </motion.div>

        {/* Details right */}
        <motion.div
          className="crew__details"
          initial={{ opacity: 0, x: 30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="crew__chief-label">{chief.title}</span>

          <h2 className="crew__name">{chief.name}</h2>

          <div className="crew__divider" aria-hidden="true" />

          <span className="crew__role">{chief.role}</span>

          <p className="crew__bio">
            The creative force behind Team Cine Chaos. Sri Harsha Nihanth drives every project
            from concept to final cut — shaping stories that are raw, intentional, and impossible to ignore.
          </p>

          <a href="/crew" className="crew__btn">
            <span>Full Profile</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </motion.div>

      </div>
    </section>
  );
}