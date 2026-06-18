import Home from "@/app/page";
import { HeroCinematic } from "@/components/HeroCinematic";

// Prototype "Cinématique" — intro vidéo tunnel ~3 s plein écran, puis reveal
// en page blanche avec titre + détails des services + vidéo encadrée.
export default function CinePrototype() {
  return <Home hero={<HeroCinematic />} />;
}
