import Home from "@/app/page";
import { HeroTrinity } from "@/components/HeroTrinity";

// Prototype "Trinité" — hero-carrousel 3 panneaux qui slide toutes les 10 s
// (horloge → bleu présence en ligne → violet automatisation/IA).
export default function TrinityPrototype() {
  return <Home hero={<HeroTrinity />} />;
}
