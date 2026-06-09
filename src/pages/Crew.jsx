import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import './Crew.css';

const DEPARTMENTS = [
  { id: 'all', label: 'All Collective' },
  { id: 'production', label: 'Direction & Production' },
  { id: 'camera', label: 'Camera & Design' },
  { id: 'sound', label: 'Sound & Music' },
  { id: 'post', label: 'Post-Production' }
];

const CREW_MEMBERS = [
  {
    id: 1,
    name: 'Sri Harsha Nihanth',
    photo : '/images/films/shn.jpeg',
    role: 'Director & Editor',
    department: 'production',
    frameIndex: '1',
    greasePencilType: 'circle',
    bio: 'The creative visionary of Team Cine Chaos.',
    Projects: ['Undying Part-1', 'Trust No Gun', 'Escape the Eclipse', 'Undying Part-2', 'Kundeti Kommu', 'Lift'],
    Skills: ['Editing', 'Direction', 'Acting', 'Designing'],
    quote: "Stories aren't made in the comfort zone. They're forged in the chaos."
  },
  {
    id: 2,
    name: 'Shruthy',
    photo : '/images/films/shr.jpeg',
    role: 'Make-up & Production',
    department: 'Production',
    frameIndex: '2',
    greasePencilType: 'check',
    bio: 'The Back-Bone & Heart of TCC.',
    Projects: ['Undying Part-1', 'Trust No Gun', 'Escape the Eclipse', 'Undying Part-2', 'Kundeti Kommu'],
    Skills: ['Editing', 'Arts'],
    quote: "Shadows tell more of the story than light ever could."
  },
  {
    id: 3,
    name: 'Sreenidhi',
    photo : '/images/films/sree.jpeg',
    role: 'Assitant Director',
    department: 'Directction',
    frameIndex: '3',
    greasePencilType: 'circle',
    bio: '',
    Projects: ['Undying Part-1', 'Kundeti Kommu', 'Undying Part-2'],
    Skills: ['Cinematography', 'Editing'],
    quote: "The screen is a mirror. If it doesn't reflect something uncomfortable, we failed."
  },
  {
    id: 4,
    name: 'Harshith Battu',
    role: 'Asst Director & Cinematographer',
    department: 'Direction',
    frameIndex: '4',
    greasePencilType: 'cross',
    bio: '',
    Projects: ['Undying Part-1', 'Kundeti Kommu', 'Undying Part-2', 'Lift'],
    Skills: ['Screenplay Writer','Editing'],
    quote: "Silence is a sound. You just have to know how to mix it."
  },
  {
    id: 5,
    name: 'Likitha',
    photo : '/images/films/lik.jpeg',
    role: 'Production',
    department: 'Production & Direction',
    frameIndex: '5',
    greasePencilType: 'star',
    bio: '',
    Projects: ['Undying Part-1', 'Trust No Gun', 'Escape the Eclipse', 'Undying Part-2', 'Kundeti Kommu'],
    Skills: ['Production'],
    quote: "Every object in a frame must whisper a secret about the character."
  },
  {
    id: 6,
    name: 'Venkateshwarlu',
    photo : '/images/films/ven.jpeg',
    role: 'Actor',
    department: 'Acting',
    frameIndex: '6',
    greasePencilType: 'circle',
    bio: '',
    Projects: ['Undying Part-1', 'Kundeti Kommu', 'Undying Part-2'],
    Skills: ['Acting', 'Choreography'],
    quote: "Color doesn't just decorate; it communicates directly to the subconscious."
  },
  {
    id: 7,
    name: 'Rithvik',
    role: 'Actor',
    photo: '/images/films/rit.jpeg',
    department: 'Actor',
    frameIndex: '7',
    greasePencilType: 'check',
    bio: '',
    Projects: ['Undying Part-1', 'Kundeti Kommu', 'Undying Part-2'],
    Skills: ['Acting', 'Dancing'],
    quote: "Controlling the darkness is just as important as positioning the light."
  },
  {
    id: 8,
    name: 'Virajith',
    photo : '/images/films/vir.jpeg',
    role: 'Production & Asst Director',
    department: 'Production',
    frameIndex: '8',
    greasePencilType: 'cross',
    bio: '',
    Projects: ['Undying Part-1', 'Kundeti Kommu', 'Undying Part-2'],
    Skills: ['Production', 'Direction', 'Designing'],
    quote: "A character's history should be written in the threads of their clothes."
  },
  {
    id: 9,
    name: 'Lasyavi',
    photo : '/images/films/las.jpeg',
    role: 'Designer',
    department: 'Production',
    frameIndex: '9',
    greasePencilType: 'circle',
    bio: "",
    Projects: ['Undying Part-1', 'Kundeti Kommu', 'Undying Part-2'],
    Skills: ['Designing', 'Editing'],
    quote: "Efficiency is the backbone that allows artistic chaos to thrive."
  },
  {
    id: 10,
    name: 'Aakanksha',
    photo : '/images/films/aak.jpeg',
    role: 'Photographer',
    department: 'Production',
    frameIndex: '10',
    greasePencilType: 'check',
    bio: '',
    Projects: ['Undying Part-1', 'Kundeti Kommu', 'Undying Part-2'],
    Skills: ['Photography', 'Lightroom', 'Designing'],
    quote: "A budget is just a creative map of what is possible on screen."
  },
  {
    id: 11,
    name: 'Ranjith',
    role: 'Production',
    photo: '/images/films/ran.jpeg',
    department: 'Production',
    frameIndex: '11',
    greasePencilType: 'star',
    bio: '',
    Projects: ['Undying Part-1', 'Kundeti Kommu', 'Undying Part-2'],
    Skills: ['Production', 'Editing'],
    quote: "Truth in cinema lies in the details—sometimes that detail is a scar."
  },
  {
    id: 12,
    name: 'Vikhyath',
    role: 'Production & Actor',
    photo : '/images/films/vik.jpeg',
    department: 'Production',
    frameIndex: '12',
    greasePencilType: 'circle',
    bio: '',
    Projects: ['Undying Part-1', 'Kundeti Kommu', 'Undying Part-2'],
    Skills: ['Production', 'Acting'],
    quote: "The story behind the lens is often as compelling as the one in front of it."
  },
  {
    id: 13,
    name: 'Giri Varun',
    photo: '/images/films/gv.jpeg',
    role: 'Asst Director & Production',
    department: 'Direction',
    frameIndex: '13',
    greasePencilType: 'check',
    bio: '',
    Projects: ['Undying Part-1', 'Kundeti Kommu', 'Undying Part-2'],
    Skills: ['Direction', 'Editing', 'Designing'],
    quote: "If a viewer notices our sound effects, we were too loud. It must be felt."
  },
  {
    id: 14,
    name: 'Sriram',
    photo : '/images/films/sri.jpeg',
    role: 'Actor & Production',
    department: 'Production',
    frameIndex: '14',
    greasePencilType: 'cross',
    bio: '',
    Projects: ['Kundeti Kommu', 'Undying Part-2'],
    Skills: ['Content Creation', 'Acting', 'Editing'],
    quote: "The best visual effects are the ones the audience never suspects exist."
  },
  {
    id: 15,
    name: 'Nitish',
    photo : '/images/films/nit.jpeg',
    role: 'Actor & Direction',
    department: 'Direction',
    frameIndex: '15',
    greasePencilType: 'star',
    bio: '',
    Projects: ['Kundeti Kommu', 'Undying Part-2'],
    Skills: ['Designing', 'Acting', 'Editing'],
    quote: "Getting a film made is only half the battle. Getting it seen is the victory."
  },
  {
    id: 16,
    name: 'Trishal',
    photo : '/images/films/tri.jpeg',
    role: 'Asst Director',
    department: 'Direction',
    frameIndex: '16',
    greasePencilType: 'circle',
    bio: "",
    Projects: ['Undying Part-1', 'Kundeti Kommu', 'Undying Part-2'],
    Skills: ['Direction'],
    quote: "Acting is not about pretending; it is about finding the truth under a mask."
  }
];

function GreasePencil({ type, isHovered }) {
  const selectStroke = {
    initial: { pathLength: 0, opacity: 0 },
    animate: isHovered ? { pathLength: 1, opacity: 0.8 } : { pathLength: 0, opacity: 0 },
    transition: { duration: 0.5, ease: [0.19, 1, 0.22, 1] }
  };

  const color = '#ff3b30';

  if (type === 'circle') {
    return (
      <svg className="grease-pencil grease-pencil--circle" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <motion.path
          d="M 12 18 C 50 10, 95 15, 88 52 C 82 82, 45 88, 18 72 C 5 58, 8 28, 38 18 C 52 13, 76 15, 71 28"
          stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
          {...selectStroke}
        />
      </svg>
    );
  }
  if (type === 'check') {
    return (
      <svg className="grease-pencil grease-pencil--check" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <motion.path
          d="M 20 52 L 42 74 L 84 22"
          stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
          {...selectStroke}
        />
      </svg>
    );
  }
  if (type === 'cross') {
    return (
      <svg className="grease-pencil grease-pencil--cross" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <motion.path d="M 15 15 L 85 85" stroke={color} strokeWidth="2.5" strokeLinecap="round" {...selectStroke} />
        <motion.path
          d="M 85 15 L 15 85"
          stroke={color} strokeWidth="2.5" strokeLinecap="round"
          {...selectStroke}
          transition={{ ...selectStroke.transition, delay: 0.15 }}
        />
      </svg>
    );
  }
  if (type === 'star') {
    return (
      <svg className="grease-pencil grease-pencil--star" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <motion.path
          d="M 50 10 L 62 36 L 90 38 L 68 55 L 75 82 L 50 67 L 25 82 L 32 55 L 10 38 L 38 36 Z"
          stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          {...selectStroke}
        />
      </svg>
    );
  }
  return null;
}

function FilmFrame({ member, index = 0, onClick }) {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-5%' });
  const staggerDelay = index * 0.15;

  const getInitials = (name) =>
    name.split(' ').map(n => n[0]).join('').toUpperCase();

  return (
    <motion.div
      ref={ref}
      className={`film-frame ${isHovered ? 'film-frame--hover' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      initial={{ opacity: 0, scale: 0.96, filter: 'blur(10px)' }}
      animate={inView ? { opacity: 1, scale: 1, filter: 'blur(0px)' } : {}}
      transition={{ duration: 0.8, delay: staggerDelay, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="film-frame__container">
        <div className="film-frame__placeholder" aria-hidden="true">
          <div className="film-frame__placeholder-stripes" />
          <span className="film-frame__initials">{getInitials(member.name)}</span>
          <span className="film-frame__placeholder-sub">frame {member.frameIndex}</span>
        </div>
        <div className="film-frame__bracket film-frame__bracket--tl" />
        <div className="film-frame__bracket film-frame__bracket--tr" />
        <div className="film-frame__bracket film-frame__bracket--bl" />
        <div className="film-frame__bracket film-frame__bracket--br" />
        <GreasePencil type="star" isHovered={isHovered} />
      </div>

    </motion.div>
  );
}

function FilmStrip({ row, onFrameClick }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-5%' });
  const sprocketCount = 18;

  return (
    <motion.div
      ref={ref}
      className="film-strip"
      initial={{ opacity: 0, x: -30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="film-strip__sprockets film-strip__sprockets--top">
        {[...Array(sprocketCount)].map((_, i) => (
          <div key={i} className="film-strip__sprocket-hole" />
        ))}
      </div>
      <div className="film-strip__frames">
        {row.map((member, index) => (
          <FilmFrame key={member.id} member={member} index={index} onClick={() => onFrameClick(member)} />
        ))}
      </div>
      <div className="film-strip__sprockets film-strip__sprockets--bottom">
        {[...Array(sprocketCount)].map((_, i) => (
          <div key={i} className="film-strip__sprocket-hole" />
        ))}
        <div className="film-strip__markers">
          {row.map((member) => (
            <div key={member.id} className="film-strip__marker">
              <span className="film-strip__marker-label">CHAOS 32C</span>
              <span className="film-strip__marker-number">{member.frameIndex}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Crew() {
  const [selectedDept, setSelectedDept] = useState('all');
  const [activeMember, setActiveMember] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredCrew = selectedDept === 'all'
    ? CREW_MEMBERS
    : CREW_MEMBERS.filter(member => member.department === selectedDept);

  const chunkedCrew = [];
  for (let i = 0; i < filteredCrew.length; i += 4) {
    chunkedCrew.push(filteredCrew.slice(i, i + 4));
  }

  // ── FIX: handleKeyDown defined inside useEffect to satisfy exhaustive-deps ──
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!activeMember) return;
      const currentIndex = filteredCrew.findIndex(m => m.id === activeMember.id);
      if (e.key === 'Escape') {
        setActiveMember(null);
      } else if (e.key === 'ArrowRight') {
        setActiveMember(filteredCrew[(currentIndex + 1) % filteredCrew.length]);
      } else if (e.key === 'ArrowLeft') {
        setActiveMember(filteredCrew[(currentIndex - 1 + filteredCrew.length) % filteredCrew.length]);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeMember, filteredCrew]);

  return (
    <main className="crew-page">
      <div className="crew-page__grid-lines" aria-hidden="true" />

      <section className="crew-page__hero">
        <motion.div
          className="crew-page__label"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="crew-page__label-line" />
          <span>Personnel Roll</span>
        </motion.div>
        <motion.h1
          className="crew-page__title"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          The Collective
        </motion.h1>
        <motion.p
          className="crew-page__desc"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.25 }}
        >
          A crew of independent directors, camera technicians, sound recordists, and artists.
          We develop stories from raw friction, capturing celluloid honesty in the cinema of chaos.
        </motion.p>
        <motion.div
          className="crew-page__filters"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
        >
          {DEPARTMENTS.map((dept) => (
            <button
              key={dept.id}
              className={`crew-page__filter-btn ${selectedDept === dept.id ? 'crew-page__filter-btn--active' : ''}`}
              onClick={() => setSelectedDept(dept.id)}
            >
              {dept.label}
              {selectedDept === dept.id && (
                <motion.span
                  className="crew-page__filter-underline"
                  layoutId="dept-underline"
                  transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                />
              )}
            </button>
          ))}
        </motion.div>
      </section>

      <section className="crew-page__sheet">
        <div className="contact-sheet-board">
          <div className="contact-sheet-board__header">
            <span className="contact-sheet-board__project">PROJECT: CINE_CHAOS_2026</span>
            <span className="contact-sheet-board__roll">ROLL: 35MM_01</span>
            <span className="contact-sheet-board__date">DATE: 08_JUNE_2026</span>
          </div>
          <div className="contact-sheet-board__strips">
            {chunkedCrew.length > 0 ? (
              chunkedCrew.map((row, idx) => (
                <FilmStrip key={idx} row={row} onFrameClick={setActiveMember} />
              ))
            ) : (
              <div className="contact-sheet-board__empty">
                <span>NO NEGATIVES FOUND</span>
              </div>
            )}
          </div>
          <div className="contact-sheet-board__footer">
            <span>CONTACT SHEET // PROCESS E-6 MONOCHROME // CONFIDENTIAL</span>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {activeMember && (
          <motion.div
            className="viewfinder-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="viewfinder-modal__backdrop" onClick={() => setActiveMember(null)} />
            <motion.div
              className="viewfinder"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="viewfinder__camera-ui">
                <div className="viewfinder__rec">
                  <span className="viewfinder__rec-dot" />
                  <span>REC</span>
                </div>
                <div className="viewfinder__battery">
                  <span>88%</span>
                  <div className="viewfinder__battery-icon" />
                </div>
                <div className="viewfinder__timecode">00:04:16:09</div>
                <div className="viewfinder__format">4K 2.39:1</div>
                <div className="viewfinder__stats">
                  <span>ISO 800</span>
                  <span>f/2.8</span>
                  <span>1/48 FPS</span>
                  <span>{activeMember.frameIndex}A</span>
                </div>
                <div className="viewfinder__crosshairs" />
                <div className="viewfinder__bracket viewfinder__bracket--tl" />
                <div className="viewfinder__bracket viewfinder__bracket--tr" />
                <div className="viewfinder__bracket viewfinder__bracket--bl" />
                <div className="viewfinder__bracket viewfinder__bracket--br" />
              </div>
              <button
                className="viewfinder__close-btn"
                onClick={() => setActiveMember(null)}
                aria-label="Eject Viewfinder"
              >
                <span>[EJECT]</span>
              </button>
              <div className="viewfinder__grid">
                <div className="viewfinder__visual">
                  {activeMember.photo ? (
                    <img src={activeMember.photo} alt={activeMember.name} className="viewfinder__photo" />
                  ) : (
                    <div className="viewfinder__placeholder">
                      <div className="viewfinder__placeholder-grain" />
                      <span className="viewfinder__placeholder-initials">
                        {activeMember.name.split(' ').map(n => n[0]).join('')}
                      </span>
                      <span className="viewfinder__placeholder-sub">NEG_CELL_{activeMember.frameIndex}</span>
                    </div>
                  )}
                </div>
                <div className="viewfinder__details">
                  <div className="viewfinder__meta">
                    <span className="viewfinder__label-tag">CREW MEMBER PROFILE</span>
                    <span className="viewfinder__marker-index">#{activeMember.frameIndex}</span>
                  </div>
                  <h2 className="viewfinder__name">{activeMember.name}</h2>
                  <span className="viewfinder__role">{activeMember.role}</span>
                  <div className="viewfinder__divider" />
                  <p className="viewfinder__bio">{activeMember.bio}</p>
                  {activeMember.quote && (
                    <blockquote className="viewfinder__quote">
                      "{activeMember.quote}"
                    </blockquote>
                  )}
                  <div className="viewfinder__meta-grid">
                    <div className="viewfinder__meta-item">
                      <span className="viewfinder__meta-title">Selected Projects</span>
                      <ul className="viewfinder__meta-list">
                        {activeMember.Projects.map((film, idx) => (
                          <li key={idx}>{film}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="viewfinder__meta-item">
                      <span className="viewfinder__meta-title">Skills / Toolkit</span>
                      <ul className="viewfinder__meta-list">
                        {activeMember.Skills.map((g, idx) => (
                          <li key={idx}>{g}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="viewfinder__nav">
                    <button
                      className="viewfinder__nav-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        const idx = filteredCrew.findIndex(m => m.id === activeMember.id);
                        setActiveMember(filteredCrew[(idx - 1 + filteredCrew.length) % filteredCrew.length]);
                      }}
                    >
                      ← PREV
                    </button>
                    <span className="viewfinder__nav-counter">
                      {filteredCrew.findIndex(m => m.id === activeMember.id) + 1} / {filteredCrew.length}
                    </span>
                    <button
                      className="viewfinder__nav-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        const idx = filteredCrew.findIndex(m => m.id === activeMember.id);
                        setActiveMember(filteredCrew[(idx + 1) % filteredCrew.length]);
                      }}
                    >
                      NEXT →
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}