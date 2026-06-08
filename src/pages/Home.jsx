import Hero from '../components/Hero';
import Manifesto from '../components/Manifesto';
import FeaturedFilms from '../components/FeaturedFilms';
import CrewPreview from '../components/CrewPreview';

export default function Home() {
  return (
    <main>
      <Hero />
      <Manifesto />
      <FeaturedFilms />
      <CrewPreview />
    </main>
  );
}