import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './FeaturedFilms.css';

const film = {
  title: 'Undying Part-1',
  subtitle: 'The Outbreak',
  year: '2025',
  genre: 'Horror · Short Film',
  duration: 'Coming Soon',
  director: 'Sri Harsha Nihanth',
  desc: 'The first chapter of the Undying saga. When a quiet town wakes to something it cannot explain, survival becomes the only story worth telling.',
  poster: null, // swap with: require('../assets/undying-poster.jpg')
};

export default function FeaturedFilms() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });

  return (
    <section className="films" ref={ref}>

      {/* Section header */}
      <div className="films__header">
        <motion.div
          className="films__label"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          <span className="films__label-line" />
          <span>Featured Film</span>
        </motion.div>
        <motion.a
          href="/films"
          className="films__view-all"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Full Portfolio →
        </motion.a>
      </div>

      {/* Film row: poster left, details right */}
      <div className="film-row">

        {/* Poster */}
        <motion.div
          className="film-row__poster"
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {film.poster ? (
            <img src={film.poster} alt={`${film.title}: ${film.subtitle} poster`} className="film-row__poster-img" />
          ) : (
            <div className="film-row__poster-placeholder" aria-hidden="true">
              <div className="film-row__poster-lines" />
              <span className="film-row__poster-label">POSTER</span>
              <span className="film-row__poster-sub">Image coming soon</span>
            </div>
          )}
          {/* Corner brackets */}
          <div className="film-row__corner film-row__corner--tl" aria-hidden="true" />
          <div className="film-row__corner film-row__corner--tr" aria-hidden="true" />
          <div className="film-row__corner film-row__corner--bl" aria-hidden="true" />
          <div className="film-row__corner film-row__corner--br" aria-hidden="true" />
        </motion.div>

        {/* Details */}
        <motion.div
          className="film-row__details"
          initial={{ opacity: 0, x: 30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Meta row */}
          <div className="film-row__meta">
            <span className="film-row__genre">{film.genre}</span>
            <span className="film-row__dot" aria-hidden="true">·</span>
            <span className="film-row__year">{film.year}</span>
            <span className="film-row__dot" aria-hidden="true">·</span>
            <span className="film-row__duration">{film.duration}</span>
          </div>

          {/* Title */}
          <h2 className="film-row__title">
            {film.title}
            <span className="film-row__subtitle">{film.subtitle}</span>
          </h2>

          {/* Divider */}
          <div className="film-row__divider" aria-hidden="true" />

          {/* Description */}
          <p className="film-row__desc">{film.desc}</p>

          {/* Director credit */}
          <div className="film-row__credit">
            <span className="film-row__credit-label">Directed by</span>
            <span className="film-row__credit-name">{film.director}</span>
          </div>

          {/* CTA */}
          <a href="/films" className="film-row__btn">
            <span>View Film Details</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </motion.div>

      </div>
    </section>
  );
}