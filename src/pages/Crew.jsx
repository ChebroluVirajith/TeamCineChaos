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
    role: 'Director & Editor',
    department: 'production',
    frameIndex: '21',
    greasePencilType: 'circle',
    bio: 'The creative visionary of Team Cine Chaos. Harsha orchestrates projects with a raw, uncompromising approach, driving every project from initial script concept to the final frame in the editing suite.',
    filmography: ['Undying Part-1', 'Chaos Theory', 'After Hours'],
    gear: ['RED Komodo 6K', 'Helios 44-2 58mm', 'DaVinci Resolve Studio'],
    quote: "Stories aren't made in the comfort zone. They're forged in the chaos."
  },
  {
    id: 2,
    name: 'Arjun Reddy',
    role: 'Director of Photography',
    department: 'camera',
    frameIndex: '22',
    greasePencilType: 'check',
    bio: 'A cinematographer obsessed with natural lighting, deep shadows, and tactile textures. Arjun uses camera movement as an emotional extension of the characters.',
    filmography: ['Undying Part-1', 'Silent Streets', 'Vignettes of AP'],
    gear: ['Sony FX6', 'Zeiss CP.3 Prime Lenses', 'Teradek Bolt 4K'],
    quote: "Shadows tell more of the story than light ever could."
  },
  {
    id: 3,
    name: 'Meera Jasmine',
    role: 'Screenwriter & Creative Producer',
    department: 'production',
    frameIndex: '23',
    greasePencilType: 'circle',
    bio: 'Meera weaves complex psychological realities and gritty human dramas. As a producer, she protects the creative core of Cine Chaos from commercial dilute.',
    filmography: ['Undying Part-1', 'Echos in the Dark', 'Fragmented'],
    gear: ['Final Draft 13', 'Moleskine Classic Notebooks'],
    quote: "The screen is a mirror. If it doesn't reflect something uncomfortable, we failed."
  },
  {
    id: 4,
    name: 'Vikram Dev',
    role: 'Sound Designer & Composer',
    department: 'sound',
    frameIndex: '24',
    greasePencilType: 'cross',
    bio: 'Vikram treats sound as a physical presence. From haunting ambient scores to sharp Foley textures, his auditory design builds half of the narrative tension.',
    filmography: ['Undying Part-1', 'Chaos Theory', 'Soundscapes of Silence'],
    gear: ['Sennheiser MKH416', 'Zoom F8n Pro Recorder', 'Pro Tools Ultimate'],
    quote: "Silence is a sound. You just have to know how to mix it."
  },
  {
    id: 5,
    name: 'Priya Sen',
    role: 'Production Designer',
    department: 'camera',
    frameIndex: '25',
    greasePencilType: 'star',
    bio: 'Priya is an architect of mood. She sculpts physical spaces to mirror characters inner psychology, utilizing detailed textures and atmospheric set dressings.',
    filmography: ['Undying Part-1', 'After Hours', 'The Last Room'],
    gear: ['iPad Pro (Procreate)', 'Leica Q3 (Location Scouting)'],
    quote: "Every object in a frame must whisper a secret about the character."
  },
  {
    id: 6,
    name: 'Rohan Mehta',
    role: 'Colorist & DIT',
    department: 'post',
    frameIndex: '26',
    greasePencilType: 'circle',
    bio: 'Rohan works in the subtle frequencies of color. He shapes the final emotional palette of the films, creating signature cinematic atmospheres.',
    filmography: ['Undying Part-1', 'Chaos Theory', 'Silent Streets'],
    gear: ['DaVinci Resolve Mini Panel', 'Flanders Scientific DM240', 'Mac Studio M2 Ultra'],
    quote: "Color doesn't just decorate; it communicates directly to the subconscious."
  },
  {
    id: 7,
    name: 'Siddharth Roy',
    role: 'Gaffer & Key Grip',
    department: 'camera',
    frameIndex: '27',
    greasePencilType: 'check',
    bio: 'Siddharth is the master of shadow and shape. He translates the DP\'s lighting visual maps into physical power setups, shaping light with absolute control.',
    filmography: ['Undying Part-1', 'After Hours', 'Echos in the Dark'],
    gear: ['Aputure 600d Pro', 'Nanlite PavoTube II', 'C-Stands & Diffusion Scrims'],
    quote: "Controlling the darkness is just as important as positioning the light."
  },
  {
    id: 8,
    name: 'Ananya Roy',
    role: 'Costume Designer',
    department: 'camera',
    frameIndex: '28',
    greasePencilType: 'cross',
    bio: 'Ananya defines the crew\'s identities through fabrics. Her designs emphasize raw textures, weathered details, and organic silhouettes that feel lived-in.',
    filmography: ['Undying Part-1', 'Fragmented', 'The Last Room'],
    gear: ['Singer Heavy Duty Sewing Machine', 'Fabric Distressing Kits'],
    quote: "A character's history should be written in the threads of their clothes."
  },
  {
    id: 9,
    name: 'Kabir Malhotra',
    role: 'First Assistant Director',
    department: 'production',
    frameIndex: '29',
    greasePencilType: 'circle',
    bio: "The general on the field. Kabir coordinates the chaos of the set, maintaining the shooting schedule and ensuring the Director's vision stays on track.",
    filmography: ['Undying Part-1', 'Chaos Theory', 'Vignettes of AP'],
    gear: ['Custom Slate', 'Motorola Walkie-Talkie', 'iPad Pro (Scriptation)'],
    quote: "Efficiency is the backbone that allows artistic chaos to thrive."
  },
  {
    id: 10,
    name: 'Neha Sharma',
    role: 'Line Producer',
    department: 'production',
    frameIndex: '30',
    greasePencilType: 'check',
    bio: 'Neha manages resources and budgets to facilitate the creative scope of our independent productions. She turns logistical constraints into artistic freedoms.',
    filmography: ['Undying Part-1', 'After Hours', 'Silent Streets'],
    gear: ['Excel spreadsheets', 'Endless cups of black coffee'],
    quote: "A budget is just a creative map of what is possible on screen."
  },
  {
    id: 11,
    name: 'Divya Nair',
    role: 'SFX Makeup Artist',
    department: 'camera',
    frameIndex: '31',
    greasePencilType: 'star',
    bio: 'Divya specializes in prosthetic effects and high-impact SFX makeup. Her work ranges from subtle wounds to the horror elements featured in our films.',
    filmography: ['Undying Part-1', 'Echos in the Dark'],
    gear: ['Skin Illustrator Palettes', 'Third Degree Silicone', 'Prosthetic Moulds'],
    quote: "Truth in cinema lies in the details—sometimes that detail is a scar."
  },
  {
    id: 12,
    name: 'Rahul Bose',
    role: 'Unit Photographer & BTS',
    department: 'camera',
    frameIndex: '32',
    greasePencilType: 'circle',
    bio: 'Rahul captures the behind-the-scenes reality of independent filmmaking. His work documents the grit, stress, and joy of the crew off-camera.',
    filmography: ['Undying Part-1', 'Chaos Theory', 'Vignettes of AP'],
    gear: ['Leica M10-D', 'Summicron 35mm f/2', 'Fujifilm GFX 100S'],
    quote: "The story behind the lens is often as compelling as the one in front of it."
  },
  {
    id: 13,
    name: 'Maya Sen',
    role: 'Foley Artist',
    department: 'sound',
    frameIndex: '33',
    greasePencilType: 'check',
    bio: 'Maya creates the textures of movement. Using a room full of random artifacts, she performs the footsteps, rustles, and impacts that make scenes feel visceral.',
    filmography: ['Undying Part-1', 'Fragmented', 'Soundscapes of Silence'],
    gear: ['Custom Foley Pit', 'Neumann KM184 Stereos', 'Leather & Rusting Metals'],
    quote: "If a viewer notices our sound effects, we were too loud. It must be felt."
  },
  {
    id: 14,
    name: 'Aditya Goel',
    role: 'VFX Supervisor',
    department: 'post',
    frameIndex: '34',
    greasePencilType: 'cross',
    bio: 'Aditya integrates digital enhancements with physical practical effects. He focuses on invisible VFX that clean up or elevate the atmosphere.',
    filmography: ['Undying Part-1', 'Chaos Theory', 'Echos in the Dark'],
    gear: ['Houdini FX', 'Nuke Studio', 'RTX 4090 Dual workstation'],
    quote: "The best visual effects are the ones the audience never suspects exist."
  },
  {
    id: 15,
    name: 'Tara Deshmukh',
    role: 'Publicity & Distribution',
    department: 'production',
    frameIndex: '35',
    greasePencilType: 'star',
    bio: 'Tara coordinates film festival submissions, press releases, and independent distribution channels. She ensures our indie stories reach the screens they deserve.',
    filmography: ['Undying Part-1', 'Vignettes of AP'],
    gear: ['Festival submission databases', 'MacBook Air'],
    quote: "Getting a film made is only half the battle. Getting it seen is the victory."
  },
  {
    id: 16,
    name: 'Karan Verma',
    role: 'Casting Director & Lead Actor',
    department: 'production',
    frameIndex: '36',
    greasePencilType: 'circle',
    bio: "Karan acts as a bridge between performance and production. He scouted the ensemble cast for Undying, and performs roles with psychological realism.",
    filmography: ['Undying Part-1', 'After Hours', 'Fragmented'],
    gear: ["Actor's physical prep journals", 'Sony Alpha 7IV (Auditions)'],
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
        {member.photo ? (
          <img src={member.photo} alt={member.name} className="film-frame__photo" />
        ) : (
          <div className="film-frame__placeholder" aria-hidden="true">
            <div className="film-frame__placeholder-stripes" />
            <span className="film-frame__initials">{getInitials(member.name)}</span>
            <span className="film-frame__placeholder-sub">frame {member.frameIndex}</span>
          </div>
        )}
        <div className="film-frame__bracket film-frame__bracket--tl" />
        <div className="film-frame__bracket film-frame__bracket--tr" />
        <div className="film-frame__bracket film-frame__bracket--bl" />
        <div className="film-frame__bracket film-frame__bracket--br" />
        <GreasePencil type="star" isHovered={isHovered} />
      </div>
      <div className="film-frame__label">
        <span className="film-frame__name">{member.name}</span>
        <span className="film-frame__role">{member.role}</span>
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
                      <span className="viewfinder__meta-title">Selected Filmography</span>
                      <ul className="viewfinder__meta-list">
                        {activeMember.filmography.map((film, idx) => (
                          <li key={idx}>{film}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="viewfinder__meta-item">
                      <span className="viewfinder__meta-title">Gear / Toolkit</span>
                      <ul className="viewfinder__meta-list">
                        {activeMember.gear.map((g, idx) => (
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