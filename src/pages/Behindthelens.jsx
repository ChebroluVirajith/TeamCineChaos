import { useRef, useEffect, useState } from 'react';
import { motion, useInView, useScroll, useSpring } from 'framer-motion';
import './Behindthelens.css';

const TIMELINE_EVENTS = [
  {
    id: 1,
    chapter: '01',
    date: 'Jan 2025',
    title: 'Ahinaya Head',
    subtitle: 'The Beginning of a Chapter',
    tag: 'Leadership',
    desc: 'Sri Harsha Nihanth takes charge as the Ahinaya Head — the moment that set the entire collective in motion. A new creative force steps into the frame.',
    image: null,
    accent: 'red',
  },
  {
    id: 2,
    chapter: '02',
    date: 'Feb 2025',
    title: 'Escape the Eclipse',
    subtitle: 'Horror in the Making',
    tag: 'Short Film',
    desc: 'The first production rolls. Cameras up, lights rigged, a town on the edge of something it cannot explain. The chaos collective finds its footing behind the lens.',
    image: null,
    accent: 'white',
  },
  {
    id: 3,
    chapter: '03',
    date: 'Jul 2025',
    title: 'Trust No Gun',
    subtitle: 'No Honor Among Outlaws',
    tag: 'Short Film',
    desc: 'Three outlaws, one bullet, an abandoned warehouse. A tense standoff shot in the dead heat of July. The collective sharpens its edge.',
    image: null,
    accent: 'white',
  },
  {
    id: 4,
    chapter: '04',
    date: 'Mar 2025',
    title: "Ahinaya Competitions '25",
    subtitle: 'First Battle on Stage',
    tag: 'Competition',
    desc: 'The collective steps onto the competitive stage for the first time. Nerves, lights, applause. A proving ground that sharpened every instinct.',
    image: null,
    accent: 'gold',
  },
  {
    id: 5,
    chapter: '05',
    date: 'Jun 2025',
    title: 'Salaar Spoof',
    subtitle: 'Trad Day Chaos',
    tag: 'Stage Performance',
    desc: 'Traditional Day becomes a stage for something unexpected. A full-throttle Salaar spoof that had the crowd roaring — raw energy, zero rehearsal fear.',
    image: null,
    accent: 'white',
  },
  {
    id: 6,
    chapter: '06',
    date: 'Oct 2025',
    title: 'Undying Part 1',
    subtitle: 'The Outbreak',
    tag: 'Short Film',
    desc: 'The saga begins. A quiet town wakes to something it cannot explain. The most ambitious production to date — SFX makeup, practical effects, a full ensemble.',
    image: null,
    accent: 'white',
  },
  {
    id: 7,
    chapter: '07',
    date: 'Feb 2026',
    title: 'Kundeti Kommu',
    subtitle: 'A Theatrical Play',
    tag: 'Theatrical Play',
    desc: 'The stage beckons. A critically acclaimed satirical play on human greed, performed live. Two hours of chaos, comedy and catharsis. Nandi Awards nominee.',
    image: null,
    accent: 'gold',
  },
  {
    id: 8,
    chapter: '08',
    date: 'Mar 2026',
    title: 'Dhurandhar Spoof',
    subtitle: 'Arts OS · The Spectacle',
    tag: 'Stage Performance',
    desc: "Arts OS brings out the collective's theatrical instincts. A Dhurandhar spoof that plays with scale, character and sheer audacity of performance.",
    image: null,
    accent: 'white',
  },
  {
    id: 9,
    chapter: '09',
    date: 'Apr 2026',
    title: 'Venky Spoof',
    subtitle: 'Rigolade OS · Pure Comedy',
    tag: 'Stage Performance',
    desc: 'Rigolade OS. The collective goes all-in on comedy — physical, irreverent, completely committed. The crowd gets the chaos they came for.',
    image: null,
    accent: 'white',
  },
  {
    id: 10,
    chapter: '10',
    date: 'Apr 2026',
    title: "Ahinaya Competitions '26",
    subtitle: 'Return of the Stage',
    tag: 'Competition',
    desc: 'A year on, the collective returns to the competitive stage — sharper, bolder, more deliberate. Everything that came before leads to this moment.',
    image: null,
    accent: 'gold',
  },
  {
    id: 11,
    chapter: '11',
    date: 'Jun 2026',
    title: 'Undying Part 2',
    subtitle: 'The Resistance',
    tag: 'In Production',
    desc: 'The saga continues. Survivors fight back. The horror has evolved — and so has the collective. Currently in production. The final frame is still being written.',
    image: null,
    accent: 'red',
    isCurrent: true,
  },
];

function TimelineCard({ event }) {
  const accentColor = {
    red: '#ff3b30',
    gold: '#d4af37',
    white: 'var(--silver)',
  }[event.accent];

  return (
    <div className="timeline-node__card" style={{ '--accent': accentColor }}>
      {/* Film strip top */}
      <div className="timeline-node__film-top">
        <div className="timeline-node__sprockets">
          {[...Array(6)].map((_, i) => <div key={i} className="timeline-node__sprocket" />)}
        </div>
        <span className="timeline-node__frame-code">CHAOS · {event.chapter} · 35MM</span>
      </div>

      {/* Image */}
      <div className="timeline-node__image-wrap">
        {event.image ? (
          <img src={event.image} alt={event.title} className="timeline-node__image" />
        ) : (
          <div className="timeline-node__image-placeholder">
            <div className="timeline-node__placeholder-lines" />
            <span className="timeline-node__placeholder-num">{event.chapter}</span>
            {event.isCurrent && (
              <span className="timeline-node__recording-badge">
                <span className="timeline-node__rec-dot" />
                IN PRODUCTION
              </span>
            )}
          </div>
        )}
        <div className="timeline-node__scanlines" />
      </div>

      {/* Text content */}
      <div className="timeline-node__content">
        <div className="timeline-node__header">
          <span className="timeline-node__tag" style={{ color: accentColor, borderColor: accentColor }}>
            {event.tag}
          </span>
          <span className="timeline-node__date">{event.date}</span>
        </div>
        <h2 className="timeline-node__title">{event.title}</h2>
        <span className="timeline-node__subtitle">{event.subtitle}</span>
        <div className="timeline-node__divider" style={{ background: accentColor }} />
        <p className="timeline-node__desc">{event.desc}</p>
      </div>

      {/* Film strip bottom */}
      <div className="timeline-node__film-bottom">
        <div className="timeline-node__sprockets">
          {[...Array(6)].map((_, i) => <div key={i} className="timeline-node__sprocket" />)}
        </div>
      </div>

      {/* Corner brackets */}
      <div className="timeline-node__corner timeline-node__corner--tl" />
      <div className="timeline-node__corner timeline-node__corner--tr" />
      <div className="timeline-node__corner timeline-node__corner--bl" />
      <div className="timeline-node__corner timeline-node__corner--br" />
    </div>
  );
}

function TimelineNode({ event, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-8%' });
  const isLeft = index % 2 === 0;

  const accentColor = {
    red: '#ff3b30',
    gold: '#d4af37',
    white: 'var(--silver)',
  }[event.accent];

  return (
    <div ref={ref} className="timeline-node">
      {isLeft ? (
        <>
          {/* Card in left column */}
          <motion.div
            className="timeline-node__card-col timeline-node__card-col--left"
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            <TimelineCard event={event} />
          </motion.div>

          {/* Dot in center column */}
          <div className="timeline-node__spine-dot">
            <motion.div
              className="timeline-node__dot-inner"
              initial={{ scale: 0 }}
              animate={inView ? { scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              style={{ background: accentColor, boxShadow: `0 0 10px ${accentColor}` }}
            />
          </div>

          {/* Empty right column */}
          <div className="timeline-node__empty" />
        </>
      ) : (
        <>
          {/* Empty left column */}
          <div className="timeline-node__empty" />

          {/* Dot in center column */}
          <div className="timeline-node__spine-dot">
            <motion.div
              className="timeline-node__dot-inner"
              initial={{ scale: 0 }}
              animate={inView ? { scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              style={{ background: accentColor, boxShadow: `0 0 10px ${accentColor}` }}
            />
          </div>

          {/* Card in right column */}
          <motion.div
            className="timeline-node__card-col timeline-node__card-col--right"
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            <TimelineCard event={event} />
          </motion.div>
        </>
      )}
    </div>
  );
}
function SpineProgress() {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="spine">
      <div className="spine__track">
        {[...Array(28)].map((_, i) => (
          <div key={i} className="spine__sprocket" />
        ))}
      </div>
      <motion.div className="spine__progress" style={{ scaleY }} />
    </div>
  );
}
export default function Behindthelens() {
  const [counterVal, setCounterVal] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    let start = 0;
    const end = TIMELINE_EVENTS.length;
    const timer = setInterval(() => {
      start += 1;
      if (start >= end) { setCounterVal(end); clearInterval(timer); }
      else setCounterVal(start);
    }, 80);
    return () => clearInterval(timer);
  }, []);

  return (
    <main className="btl-page">
      <div className="btl-page__grid-lines" aria-hidden="true" />

      {/* Hero */}
      <section className="btl-hero">
        <motion.div
          className="btl-hero__eyebrow"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="btl-hero__eyebrow-line" />
          <span>Collective Chronicle</span>
        </motion.div>

        <motion.h1
          className="btl-hero__title"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          Behind
          <span className="btl-hero__title-accent"> the Lens</span>
        </motion.h1>

        <motion.p
          className="btl-hero__desc"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Every frame has a story before it's a film. This is the uncut record —
          the productions, performances, and milestones that shaped Team Cine Chaos
          from a single decision in January 2025 to everything that followed.
        </motion.p>

        <motion.div
          className="btl-hero__stats"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
        >
          <div className="btl-hero__stat">
            <span className="btl-hero__stat-num">{counterVal}</span>
            <span className="btl-hero__stat-label">Chapters</span>
          </div>
          <div className="btl-hero__stat-divider" />
          <div className="btl-hero__stat">
            <span className="btl-hero__stat-num">18</span>
            <span className="btl-hero__stat-label">Months</span>
          </div>
          <div className="btl-hero__stat-divider" />
          <div className="btl-hero__stat">
            <span className="btl-hero__stat-num">1</span>
            <span className="btl-hero__stat-label">Collective</span>
          </div>
        </motion.div>

        <motion.div
          className="btl-hero__scroll-cue"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <motion.div
            className="btl-hero__scroll-line"
            animate={{ scaleY: [0, 1, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <span>SCROLL TO ROLL</span>
        </motion.div>
      </section>

      {/* Timeline */}
      <section className="btl-timeline">
        <SpineProgress />
        <div className="btl-timeline__nodes">
          {TIMELINE_EVENTS.map((event, index) => (
            <TimelineNode key={event.id} event={event} index={index} />
          ))}
        </div>

        <motion.div
          className="btl-timeline__end"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 1 }}
        >
          <div className="btl-timeline__end-line" />
          <span className="btl-timeline__end-label">END OF ROLL · THE STORY CONTINUES</span>
          <div className="btl-timeline__end-line" />
        </motion.div>
      </section>
    </main>
  );
}