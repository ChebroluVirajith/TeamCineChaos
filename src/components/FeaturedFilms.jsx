import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './FeaturedFilms.css';

const films = [
  {
    id: 1,
    title: 'Ashes & Echo',
    year: '2024',
    genre: 'Drama · Short Film',
    duration: '18 min',
    desc: 'A woman revisits her childhood home after a decade of silence. What she finds redefines grief.',
    role: 'Director / Cinematographer',
    award: 'Best Narrative — Indie Lens 2024',
  },
  {
    id: 2,
    title: 'The Last Monsoon',
    year: '2024',
    genre: 'Documentary',
    duration: '34 min',
    desc: 'Farmers in coastal Andhra face an uncertain harvest as irregular rains reshape their lives.',
    role: 'Director / Editor',
    award: null,
  },
  {
    id: 3,
    title: 'Static',
    year: '2023',
    genre: 'Experimental',
    duration: '9 min',
    desc: 'A meditation on memory and signal loss. Shot entirely on expired Super-8 stock.',
    role: 'Director / Sound Design',
    award: 'Selected — Chaos Frame Fest 2023',
  },
];

const ROMAN = ['I', 'II', 'III'];

export default function FeaturedFilms() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });

  return (
    <section className="films" ref={ref}>
      {/* Header */}
      <div className="films__header">
        <motion.div
          className="films__label"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          <span className="films__label-line" />
          <span>Selected Works</span>
        </motion.div>
        <motion.h2
          className="films__heading"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          Films That Matter
        </motion.h2>
        <motion.a
          href="/films"
          className="films__view-all"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          Full Portfolio →
        </motion.a>
      </div>

      {/* Cards grid */}
      <div className="films__grid">
        {films.map((film, i) => (
          <motion.article
            key={film.id}
            className={`film-card film-card--${i}`}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Poster placeholder */}
            <div className="film-card__poster" aria-hidden="true">
              <div className="film-card__poster-inner">
                <span className="film-card__roman">{ROMAN[i]}</span>
              </div>
              <div className="film-card__poster-lines" />
            </div>

            {/* Meta */}
            <div className="film-card__meta">
              <span className="film-card__genre">{film.genre}</span>
              <span className="film-card__duration">{film.duration}</span>
            </div>

            {/* Title */}
            <h3 className="film-card__title">
              <span className="film-card__year">{film.year}</span>
              {film.title}
            </h3>

            <p className="film-card__desc">{film.desc}</p>

            <div className="film-card__footer">
              <span className="film-card__role">{film.role}</span>
              {film.award && (
                <span className="film-card__award">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/>
                  </svg>
                  {film.award}
                </span>
              )}
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}