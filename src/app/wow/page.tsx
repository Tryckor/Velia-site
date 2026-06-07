import Home from "@/app/page";
import { VideoHeroWow } from "@/components/VideoHeroWow";

// "WOW" prototype — same site, cinematic hero (living aurora + kinetic title).
export default function WowPrototype() {
  return <Home hero={<VideoHeroWow />} />;
}
