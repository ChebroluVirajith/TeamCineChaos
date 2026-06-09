import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/global.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Crew from './pages/Crew';
import Films from './pages/Films';
import Behindthelens from './pages/Behindthelens';
import Home from './pages/Home';

const Placeholder = ({ title }) => (
  <main style={{
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: '1rem',
    paddingTop: '5rem',
    fontFamily: 'var(--font-title)',
    fontSize: '3rem',
    color: 'var(--mid-gray)',
    letterSpacing: '0.1em',
  }}>
    <span>{title}</span>
    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.2em', color: 'var(--dark-gray)' }}>
      COMING SOON
    </span>
  </main>
);

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/"         element={<Home />} />
        <Route path="/films"    element={<Films />} />
       <Route path="/crew"     element={<Crew />} />
        <Route path="/behindthelens"      element={<Behindthelens />} />
        <Route path="/contact"  element={<Placeholder title="CONTACT" />} />
      </Routes>
      <Footer />
    </Router>
  );
}