import Hero from '../components/Hero';
import Manifesto from '../components/Manifesto';
import FeaturedFilms from '../components/FeaturedFilms';
import CrewPreview from '../components/CrewPreview';
import SectionTransition from '../components/SectionTransition';
import ScrollReveal from '../components/ScrollReveal';

export default function Home() {
  return (
    <main>
      <Hero />

      <SectionTransition />
      <ScrollReveal direction="up" distance={40}>
        <Manifesto />
      </ScrollReveal>

      <SectionTransition />
      <ScrollReveal direction="up" distance={40} delay={0.05}>
        <FeaturedFilms />
      </ScrollReveal>

      <SectionTransition />
      <ScrollReveal direction="up" distance={40} delay={0.05}>
        <CrewPreview />
      </ScrollReveal>

      <SectionTransition />
    </main>
  );
}