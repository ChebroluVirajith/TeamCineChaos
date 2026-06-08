import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './Footer.css';

export default function Footer() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });

  return (
    <>
      {/* CTA band */}
      <section className="cta" ref={ref}>
        <div className="cta__inner">
          <motion.div
            className="cta__label"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
          >
            <span className="cta__label-line" />
            <span>Let's Make Something</span>
            <span className="cta__label-line" />
          </motion.div>

          <motion.h2
            className="cta__heading"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            Got a story worth telling?
          </motion.h2>

          <motion.p
            className="cta__sub"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            We collaborate on short films, documentaries, brand films, and experimental projects.
            If you have a vision, we'll help you bring it to life.
          </motion.p>

          <motion.div
            className="cta__actions"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <a href="/contact" className="cta__btn">
              <span>Start a Conversation</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <a href="mailto:cinechaos@example.com" className="cta__email">
              cinechaos@example.com
            </a>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer__inner">
          {/* Left */}
          <div className="footer__brand">
            <div className="footer__logo">
              <span className="footer__logo-team">TEAM</span>
              <span className="footer__logo-main">CINE CHAOS</span>
            </div>
            <p className="footer__tagline">Independent Film Collective · Vijayawada, AP</p>
          </div>

          {/* Center: nav */}
          <nav className="footer__nav" aria-label="Footer navigation">
            {['Home', 'Films', 'Crew', 'Behind The Lens', 'Contact'].map(item => (
              <a key={item} href={`/${item.toLowerCase().replace(/ /g, '-')}`} className="footer__nav-link">
                {item}
              </a>
            ))}
          </nav>

          {/* Right: socials */}
          <div className="footer__socials">
            {[
              { label: 'Instagram', url: 'https://instagram.com' },
              { label: 'YouTube',   url: 'https://youtube.com' },
              { label: 'Vimeo',     url: 'https://vimeo.com' },
            ].map(({ label, url }) => (
              <a key={label} href={url} target="_blank" rel="noreferrer" className="footer__social">{label}</a>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer__bottom">
          <div className="footer__filmstrip" aria-hidden="true">
            {[...Array(30)].map((_, i) => <div key={i} className="footer__filmstrip-frame" />)}
          </div>
          <div className="footer__copy">
            <span>© 2024 Team Cine Chaos. All rights reserved.</span>
            <span className="footer__copy-sep">·</span>
            <span>Crafted with chaos & intention.</span>
          </div>
        </div>
      </footer>
    </>
  );
}