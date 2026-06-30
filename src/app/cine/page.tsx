import { Home } from "@/app/page";
import { HeroCinematic } from "@/components/HeroCinematic";
import { ClockSection } from "@/components/ClockSection";

// Prototype "Cinématique" — intro vidéo tunnel ~3 s plein écran, puis reveal
// en page blanche avec titre + détails des services + vidéo encadrée.
export default function CinePrototype() {
  // navLight=false → navbar en texte foncé, visible sur la page blanche
  // (pendant l'intro vidéo sombre, l'overlay plein écran la masque de toute façon).
  return (
    <Home
      hero={<HeroCinematic />}
      navLight={false}
      midSection={<ClockSection />}
    />
  );
}
