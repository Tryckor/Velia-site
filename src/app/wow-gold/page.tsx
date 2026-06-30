import { Home } from "@/app/page";
import { VideoHeroWow } from "@/components/VideoHeroWow";

// Cinematic hero (wide white pool) with a gold → champagne gradient palette.
export default function WowGoldPrototype() {
  return (
    <div className="theme-gold">
      <Home hero={<VideoHeroWow wide />} />
    </div>
  );
}
