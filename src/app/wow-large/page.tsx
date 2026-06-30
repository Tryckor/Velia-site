import { Home } from "@/app/page";
import { VideoHeroWow } from "@/components/VideoHeroWow";

// Same cinematic hero but with the WIDE white floor pool (for comparison).
export default function WowLargePrototype() {
  return <Home hero={<VideoHeroWow wide />} />;
}
