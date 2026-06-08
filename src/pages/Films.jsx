import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from '../components/ScrollReveal';
import SectionTransition from '../components/SectionTransition';
import './Films.css';

const FILTERS = [
  { id: 'all', label: 'All Projects' },
  { id: 'short', label: 'Short Films' },
  { id: 'play', label: 'Theatrical Plays' }
];

const FILMS_DATA = [
  {
    id: 1,
    title: 'Trust No Gun',
    subtitle: 'No Honor Among Outlaws',
    year: '2023',
    genre: 'Action Thriller · Short Film',
    category: 'short',
    duration: '14 Mins',
    director: 'Sri Harsha Nihanth',
    desc: "A tense standoff in an abandoned warehouse where three outlaws realize they've been set up. Trust is a luxury none of them can afford when there's only one bullet left.",
    cast: ['Karan Verma', 'Arjun Reddy', 'Kabir Malhotra'],
    crew: {
      'Director': 'Sri Harsha Nihanth',
      'Director of Photography': 'Arjun Reddy',
      'Sound Designer': 'Vikram Dev',
      'Art Director': 'Priya Sen'
    },
    festivals: [
      'Vijayawada Indie Film Festival (Best Director)',
      'Hyderabad Cine Awards (Official Selection)'
    ],
    format: 'Digital 4K · 2.39:1 CinemaScope'
  },
  {
    id: 2,
    title: 'The Lyft',
    subtitle: 'The Ride You Can\'t Escape',
    year: '2024',
    genre: 'Mystery Thriller · Short Film',
    category: 'short',
    duration: '18 Mins',
    director: 'Sri Harsha Nihanth',
    desc: 'A late-night ride-share passenger suspects his driver is not who the app says he is. As they take unfamiliar turns through the sleeping city, a psychological game of chess begins.',
    cast: ['Karan Verma', 'Vikram Dev'],
    crew: {
      'Director': 'Sri Harsha Nihanth',
      'Director of Photography': 'Arjun Reddy',
      'Composer': 'Vikram Dev',
      'Colorist': 'Rohan Mehta'
    },
    festivals: [
      'South India Short Film Festival (Best Actor)',
      'Vizag Film Fest (Special Jury Award)'
    ],
    format: 'Digital 4K · 1.85:1 Flat'
  },
  {
    id: 3,
    title: 'Undying Part 1',
    subtitle: 'The Outbreak',
    year: '2025',
    genre: 'Horror · Short Film',
    category: 'short',
    duration: 'Coming Soon',
    director: 'Sri Harsha Nihanth',
    desc: 'The first chapter of the Undying saga. When a quiet town wakes to something it cannot explain, survival becomes the only story worth telling.',
    cast: ['Karan Verma', 'Divya Nair', 'Priya Sen'],
    crew: {
      'Director': 'Sri Harsha Nihanth',
      'Director of Photography': 'Arjun Reddy',
      'SFX Makeup': 'Divya Nair',
      'VFX Supervisor': 'Aditya Goel'
    },
    festivals: [
      'Cine Chaos Fest (Opening Film)'
    ],
    format: 'Digital 6K · 2.39:1 CinemaScope'
  },
  {
    id: 4,
    title: 'Undying Part 2',
    subtitle: 'The Resistance',
    year: '2026',
    genre: 'Horror Action · Short Film',
    category: 'short',
    duration: 'In Production',
    director: 'Sri Harsha Nihanth',
    desc: 'In the aftermath of the outbreak, the survivors band together to reclaim their town. But the horror has evolved, and the real enemy might be within their own walls.',
    cast: ['Karan Verma', 'Divya Nair', 'Kabir Malhotra'],
    crew: {
      'Director': 'Sri Harsha Nihanth',
      'Director of Photography': 'Arjun Reddy',
      'Sound Designer': 'Vikram Dev',
      'VFX Supervisor': 'Aditya Goel'
    },
    festivals: [
      'Forthcoming Submissions (Late 2026)'
    ],
    format: 'Digital 6K · 2.39:1 CinemaScope'
  },
  {
    id: 5,
    title: 'Kundeti Kommu',
    subtitle: 'A Theatrical Play',
    year: '2026',
    genre: 'Satire Drama · Theatrical Play',
    category: 'play',
    duration: '120 Mins',
    director: 'Sri Harsha Nihanth',
    desc: 'A critically acclaimed theatrical play exploring the absurdities of human greed and societal expectations. Told through a satirical lens with vibrant physical performances.',
    cast: ['Karan Verma', 'Priya Sen', 'Kabir Malhotra', 'Divya Nair'],
    crew: {
      'Stage Director': 'Sri Harsha Nihanth',
      'Set Designer': 'Priya Sen',
      'Sound Designer': 'Vikram Dev',
      'PR Manager': 'Tara Deshmukh'
    },
    festivals: [
      'Nandi Theatre Awards (Best Play Nominee)',
      'AP Cultural Stage Fest (Opening Night Selection)'
    ],
    format: 'Live Stage Performance · Quad Sound Monitor',
    isTheatrical: true,
    gallery: Array.from({ length: 12 }).map((_, i) => ({
      id: i + 1,
      src: null, // User will swap later
      caption: `Kundeti Kommu - Production Still #${String(i + 1).padStart(2, '0')}`
    }))
  }
];

function FilmRow({ film, index, onOpenDetails }) {
  const [isHovered, setIsHovered] = useState(false);
  const [btnHovered, setBtnHovered] = useState(false);

  return (
    <div
      className={`films-row ${film.isTheatrical ? 'films-row--theatrical' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Poster on Left */}
      <div className="films-row__poster-container">
        <div className="films-row__poster-wrapper">
          <div className="films-row__scanlines" />
          {film.poster ? (
            <img src={film.poster} alt={film.title} className="films-row__poster-img" />
          ) : (
            <div className="films-row__poster-placeholder" aria-hidden="true">
              <div className="films-row__poster-lines" />
              <span>POSTER</span>
              <span className="films-row__poster-sub">{film.year}</span>
            </div>
          )}
        </div>
        <div className="films-row__corner films-row__corner--tl" />
        <div className="films-row__corner films-row__corner--tr" />
        <div className="films-row__corner films-row__corner--bl" />
        <div className="films-row__corner films-row__corner--br" />
      </div>

      {/* Details on Right */}
      <div className="films-row__details">
        <div className="films-row__meta">
          <span className="films-row__genre">{film.genre}</span>
          <span className="films-row__dot" aria-hidden="true">·</span>
          <span className="films-row__year">{film.year}</span>
          <span className="films-row__dot" aria-hidden="true">·</span>
          <span className="films-row__duration">{film.duration}</span>
        </div>

        {/* Title with Grease Pencil Underline */}
        <h2 className="films-row__title">
          {film.title}
          {film.subtitle && <span className="films-row__subtitle">{film.subtitle}</span>}
          
          {/* Grease Pencil SVG underline */}
          <div className="films-row__underline-wrap">
            <svg className="films-row__pencil-underline" viewBox="0 0 100 10" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
              <motion.path
                d="M 2 5 Q 50 8, 98 4"
                stroke="#ff3b30"
                strokeWidth="3.5"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={isHovered ? { pathLength: 1 } : { pathLength: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              />
            </svg>
          </div>
        </h2>

        <div className="films-row__divider" />

        <p className="films-row__desc">{film.desc}</p>

        <div className="films-row__credit">
          <span className="films-row__credit-label">Directed by</span>
          <span className="films-row__credit-name">{film.director}</span>
        </div>

        {/* Tracing Border CTA Button */}
        <button
          className="films-row__btn"
          onMouseEnter={() => setBtnHovered(true)}
          onMouseLeave={() => setBtnHovered(false)}
          onClick={onOpenDetails}
        >
          <span>View Details</span>
          <svg className="films-row__btn-svg" viewBox="0 0 100 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <motion.rect
              x="0.5" y="0.5" width="99" height="99"
              stroke={film.isTheatrical ? '#d4af37' : '#faf8f4'}
              strokeWidth="2.5"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={btnHovered ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{ duration: 0.45, ease: "easeInOut" }}
              style={{ vectorEffect: 'non-scaling-stroke' }}
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default function Films() {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [activeFilm, setActiveFilm] = useState(null);
  const [activeGalleryImg, setActiveGalleryImg] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredFilms = selectedFilter === 'all'
    ? FILMS_DATA
    : FILMS_DATA.filter(film => film.category === selectedFilter);

  // Handle keyboard navigation for modal and gallery lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (activeGalleryImg && activeFilm && activeFilm.gallery) {
        const idx = activeFilm.gallery.findIndex(g => g.id === activeGalleryImg.id);
        if (e.key === 'Escape') {
          setActiveGalleryImg(null);
        } else if (e.key === 'ArrowRight') {
          const next = (idx + 1) % activeFilm.gallery.length;
          setActiveGalleryImg(activeFilm.gallery[next]);
        } else if (e.key === 'ArrowLeft') {
          const prev = (idx - 1 + activeFilm.gallery.length) % activeFilm.gallery.length;
          setActiveGalleryImg(activeFilm.gallery[prev]);
        }
      } else if (activeFilm) {
        if (e.key === 'Escape') {
          setActiveFilm(null);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeFilm, activeGalleryImg]);

  return (
    <main className="films-page">
      <div className="films-page__grid-lines" aria-hidden="true" />

      {/* Hero */}
      <section className="films-page__hero">
        <motion.div
          className="films-page__label"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="films-page__label-line" />
          <span>Press Kit Portfolio</span>
        </motion.div>

        <motion.h1
          className="films-page__title"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          Filmography
        </motion.h1>

        <motion.p
          className="films-page__desc"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.25 }}
        >
          A log of projects captured on stage and celluloid. From tense noir standoffs 
          to satirical theatre, exploring authentic narratives with raw focus.
        </motion.p>

        {/* Filter Toggles */}
        <motion.div
          className="films-page__filters"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
        >
          {FILTERS.map((f) => (
            <button
              key={f.id}
              className={`films-page__filter-btn ${selectedFilter === f.id ? 'films-page__filter-btn--active' : ''}`}
              onClick={() => setSelectedFilter(f.id)}
            >
              {f.label}
              {selectedFilter === f.id && (
                <motion.span
                  className="films-page__filter-underline"
                  layoutId="films-filter-underline"
                  transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                />
              )}
            </button>
          ))}
        </motion.div>
      </section>

      {/* Transition Line */}
      <div className="films-page__separator">
        <SectionTransition />
      </div>

      {/* Film Rows List */}
      <section className="films-page__list">
        <motion.div className="films-page__list-inner" layout="position">
          <AnimatePresence mode="popLayout">
            {filteredFilms.map((film, idx) => (
              <motion.div
                key={film.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30, transition: { duration: 0.3 } }}
                transition={{
                  duration: 0.75,
                  delay: idx * 0.12, // Stagger on initial page load
                  ease: [0.16, 1, 0.3, 1]
                }}
                className="films-page__row-wrap"
              >
                <ScrollReveal direction="up" distance={30} once={true}>
                  <FilmRow film={film} index={idx} onOpenDetails={() => setActiveFilm(film)} />
                </ScrollReveal>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Detail Lightbox Modal */}
      <AnimatePresence>
        {activeFilm && (
          <motion.div
            className="film-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <div className="film-modal__backdrop" onClick={() => setActiveFilm(null)} />

            <motion.div
              className={`film-modal__content ${activeFilm.isTheatrical ? 'film-modal__content--theatrical' : ''}`}
              initial={{ scale: 0.93, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.93, opacity: 0, y: 20 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Eject / Close button */}
              <button
                className="film-modal__close-btn"
                onClick={() => setActiveFilm(null)}
                aria-label="Close details"
              >
                <span>[CLOSE]</span>
              </button>

              <div className="film-modal__grid">
                {/* Left Column: Poster */}
                <div className="film-modal__poster-column">
                  {activeFilm.poster ? (
                    <img src={activeFilm.poster} alt={activeFilm.title} className="film-modal__poster-img" />
                  ) : (
                    <div className="film-modal__poster-placeholder">
                      <div className="film-modal__placeholder-grain" />
                      <span className="film-modal__placeholder-year">{activeFilm.year}</span>
                      <span className="film-modal__placeholder-title">{activeFilm.title}</span>
                    </div>
                  )}
                </div>

                {/* Right Column: Copy & Details */}
                <div className="film-modal__details-column">
                  <div className="film-modal__meta">
                    <span className="film-modal__genre">{activeFilm.genre}</span>
                    {activeFilm.isTheatrical && <span className="film-modal__theatrical-badge">STAGE PRODUCTIONS</span>}
                  </div>

                  <h2 className="film-modal__title">
                    {activeFilm.title}
                    {activeFilm.subtitle && <span className="film-modal__subtitle">{activeFilm.subtitle}</span>}
                  </h2>

                  <div className="film-modal__divider" />

                  <div className="film-modal__scrollable">
                    <div className="film-modal__section">
                      <h3>Synopsis</h3>
                      <p className="film-modal__synopsis">{activeFilm.desc}</p>
                    </div>

                    <div className="film-modal__meta-grid">
                      {/* Credits */}
                      <div className="film-modal__section">
                        <h3>Cast</h3>
                        <p className="film-modal__text">{activeFilm.cast.join(', ')}</p>
                      </div>

                      <div className="film-modal__section">
                        <h3>Format & Specs</h3>
                        <p className="film-modal__text">{activeFilm.format}</p>
                      </div>
                    </div>

                    <div className="film-modal__section">
                      <h3>Key Production Crew</h3>
                      <div className="film-modal__credits-list">
                        {Object.entries(activeFilm.crew).map(([role, name]) => (
                          <div key={role} className="film-modal__credit-item">
                            <span className="film-modal__role-label">{role}:</span>
                            <span className="film-modal__name-val">{name}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {activeFilm.festivals && activeFilm.festivals.length > 0 && (
                      <div className="film-modal__section">
                        <h3>Festival Run & Accolades</h3>
                        <ul className="film-modal__festivals-list">
                          {activeFilm.festivals.map((fest, index) => (
                            <li key={index} className="film-modal__fest-item">
                              <span className="film-modal__fest-dot" />
                              <span>{fest}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Gallery Section */}
                    {activeFilm.gallery && activeFilm.gallery.length > 0 && (
                      <div className="film-modal__section film-modal__section--gallery">
                        <h3>Production Gallery</h3>
                        <div className="film-modal__gallery-grid">
                          {activeFilm.gallery.map((img, i) => (
                            <div
                              key={img.id}
                              className="film-modal__gallery-item"
                              onClick={() => setActiveGalleryImg(img)}
                            >
                              {img.src ? (
                                <img src={img.src} alt={img.caption} className="film-modal__gallery-thumb" />
                              ) : (
                                <div className="film-modal__gallery-placeholder">
                                  <div className="film-modal__gallery-lines" />
                                  <span className="film-modal__gallery-slide-num">SLIDE #{String(i + 1).padStart(2, '0')}</span>
                                  <span className="film-modal__gallery-tba">TBA</span>
                                </div>
                              )}
                              <div className="film-modal__gallery-overlay">
                                <span>[VIEW]</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {activeGalleryImg && activeFilm && (
          <motion.div
            className="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="lightbox__backdrop" onClick={() => setActiveGalleryImg(null)} />

            {/* Eject/Close */}
            <button className="lightbox__close-btn" onClick={() => setActiveGalleryImg(null)}>
              <span>[CLOSE LIGHTBOX]</span>
            </button>

            {/* Content Container */}
            <motion.div
              className="lightbox__container"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="lightbox__content-wrap">
                {activeGalleryImg.src ? (
                  <img src={activeGalleryImg.src} alt={activeGalleryImg.caption} className="lightbox__img" />
                ) : (
                  <div className="lightbox__placeholder">
                    <span className="lightbox__placeholder-title">{activeFilm.title}</span>
                    <span className="lightbox__placeholder-slide">PRODUCTION SLIDE #{activeGalleryImg.id}</span>
                    <span className="lightbox__placeholder-tba">IMAGE REPLACEMENT PENDING</span>
                  </div>
                )}
                <div className="lightbox__caption">
                  <span>{activeGalleryImg.caption}</span>
                </div>
              </div>

              {/* Navigation buttons */}
              <button
                className="lightbox__nav-btn lightbox__nav-btn--prev"
                onClick={(e) => {
                  e.stopPropagation();
                  const idx = activeFilm.gallery.findIndex(g => g.id === activeGalleryImg.id);
                  const prev = (idx - 1 + activeFilm.gallery.length) % activeFilm.gallery.length;
                  setActiveGalleryImg(activeFilm.gallery[prev]);
                }}
              >
                ← PREV
              </button>
              <button
                className="lightbox__nav-btn lightbox__nav-btn--next"
                onClick={(e) => {
                  e.stopPropagation();
                  const idx = activeFilm.gallery.findIndex(g => g.id === activeGalleryImg.id);
                  const next = (idx + 1) % activeFilm.gallery.length;
                  setActiveGalleryImg(activeFilm.gallery[next]);
                }}
              >
                NEXT →
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}