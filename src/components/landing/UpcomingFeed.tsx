import { upcomingLaunches } from "./data";
import iconHandshake from "@/assets/icon-handshake-heart.png";

export function UpcomingFeed() {
  return (
    <section id="feed" className="bg-cream-deep">
      <div className="mx-auto max-w-7xl px-4 py-24">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-brand">
              Product Hunt · Upcoming
            </p>
            <h2 className="mt-3 max-w-2xl text-4xl font-black tracking-tight sm:text-5xl">
              Founders already building launch momentum
            </h2>
            <p className="mt-4 max-w-2xl text-foreground/75">
              LaunchPact is a pact network, not a launch site. Browse upcoming Product Hunt launches and back the ones you'd genuinely upvote.
            </p>
          </div>
          <a
            href="#signup"
            className="inline-flex shrink-0 items-center rounded-xl border-2 border-ink/15 bg-white px-5 py-3 text-sm font-semibold hover:bg-white/70"
          >
            List your PH launch date
          </a>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {upcomingLaunches.map((l) => (
            <a
              key={l.slug}
              href={`#${l.slug}`}
              className="group flex flex-col overflow-hidden rounded-2xl border-2 border-ink/10 bg-white transition hover:border-brand/40 hover:pixel-shadow-sm"
            >
              <div className={`relative flex h-40 items-center justify-center bg-gradient-to-br ${l.accent}`}>
                <span className="font-display text-3xl font-black text-ink/70">{l.name}</span>
                <span className="absolute right-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-ink">
                  In {l.daysAway}d
                </span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-lg font-extrabold">{l.name}</h3>
                <p className="mt-1 line-clamp-2 text-sm text-foreground/70">{l.tagline}</p>
                <div className="mt-3 flex items-center gap-2 text-xs text-foreground/60">
                  <span className="inline-block h-5 w-5 rounded-full bg-gradient-to-br from-brand to-rose-400" />
                  <span className="font-medium text-foreground/80">{l.author}</span>
                  <span>·</span>
                  <span>{l.category}</span>
                </div>
                <div className="mt-4 flex items-center justify-between border-t border-border/60 pt-4">
                  <div className="flex items-center gap-2">
                    <img src={iconHandshake} alt="" width={24} height={24} className="h-6 w-6" loading="lazy" />
                    <span className="text-lg font-black text-brand">{l.pledges}</span>
                  </div>
                  <span className="text-xs font-medium text-foreground/60">Will upvote on PH day</span>
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a href="#signup" className="text-sm font-semibold text-brand hover:underline">
            See the full pact feed →
          </a>
        </div>
      </div>
    </section>
  );
}
