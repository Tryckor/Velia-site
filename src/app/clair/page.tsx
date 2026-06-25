import Home from "@/app/page";
import { VideoHeroLight } from "@/components/VideoHeroLight";

// Prototype "Clair" — le hero horloge inversé (noir↔blanc), accent bleu gardé.
export default function ClairPrototype() {
  return <Home hero={<VideoHeroLight />} navLight={false} />;
}
