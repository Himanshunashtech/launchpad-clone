import { Nav } from "./Nav";
import { AnnouncementBar } from "./AnnouncementBar";
import { Hero } from "./Hero";
import { StatsStrip } from "./StatsStrip";
import { Problem } from "./Problem";
import { Solution } from "./Solution";
import { UpcomingFeed } from "./UpcomingFeed";
import { PastResults } from "./PastResults";
import { HowItWorks } from "./HowItWorks";
import { FinalCTA } from "./FinalCTA";
import { Footer } from "./Footer";

export function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <AnnouncementBar />
      <Nav />
      <main>
        <Hero />
        <StatsStrip />
        <Problem />
        <Solution />
        <UpcomingFeed />
        <PastResults />
        <HowItWorks />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
