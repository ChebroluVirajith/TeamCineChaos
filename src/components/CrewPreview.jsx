import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './CrewPreview.css';

const crew = [
  { name: 'Arjun Mehta',    role: 'Director & Founder',      initial: 'AM' },
  { name: 'Priya Nair',     role: 'Cinematographer',          initial: 'PN' },
  { name: 'Kiran Das',      role: 'Editor & Colorist',        initial: 'KD' },
  { name: 'Sana Rashid',    role: 'Sound Designer',           initial: 'SR' },
];

export default function CrewPreview() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });

  return (
    <section className="crew" ref={ref}>
      <div className="crew__inner">
        {/* Left: text */}
        <div className="crew__text">
          <motion.div
            className="crew__label"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
          >
            <span className="crew__label-line" />
            <span>The People</span>
          </motion.div>

          <motion.h2
            className="crew__heading"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            Behind Every<br />Frame, a Face.
          </motion.h2>

          <motion.p
            className="crew__body"
            initial={{ opacity: 0, y: 15 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            A tight-knit collective of storytellers spread across Andhra Pradesh,
            each bringing a distinct craft and relentless passion to every project.
          </motion.p>

          <motion.a
            href="/crew"
            className="crew__link"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            Meet the Full Crew →
          </motion.a>
        </div>

        {/* Right: portraits grid */}
        <div className="crew__portraits">
          {crew.map((member, i) => (
            <motion.div
              key={member.name}
              className={`crew__portrait crew__portrait--${i}`}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Portrait frame */}
              <div className="crew__frame">
                <div className="crew__photo" aria-hidden="true">
                  <span className="crew__initial">{member.initial}</span>
                  {/* Halftone / grain texture overlay */}
                  <div className="crew__photo-overlay" />
                  {/* Film scratch lines */}
                  <div className="crew__scratch" />
                </div>
                {/* Frame border decoration */}
                <div className="crew__frame-corner crew__frame-corner--tl" aria-hidden="true" />
                <div className="crew__frame-corner crew__frame-corner--tr" aria-hidden="true" />
                <div className="crew__frame-corner crew__frame-corner--bl" aria-hidden="true" />
                <div className="crew__frame-corner crew__frame-corner--br" aria-hidden="true" />
              </div>
              {/* Name plate */}
              <div className="crew__nameplate">
                <span className="crew__name">{member.name}</span>
                <span className="crew__role">{member.role}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}