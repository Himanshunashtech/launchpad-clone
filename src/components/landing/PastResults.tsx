import { pastLaunches } from "./data";
import iconHandshake from "@/assets/icon-handshake-heart.png";
import iconLaunch from "@/assets/icon-launch.png";

export function PastResults() {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-7xl px-4 py-24">
        <p className="text-xs font-bold uppercase tracking-widest text-brand">Verified launch momentum</p>
        <h2 className="mt-3 max-w-3xl text-4xl font-black tracking-tight sm:text-5xl">
          Real founders. Real upvotes. Real results.
        </h2>
        <p className="mt-4 max-w-3xl text-foreground/75">
          Past Product Hunt launches on LaunchPact stacked expected and verified upvotes through mutual pacts — every vote screenshot-checked.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {pastLaunches.map((l) => (
            <div
              key={l.slug}
              className="flex flex-col overflow-hidden rounded-2xl border-2 border-ink/10 bg-white"
            >
              <div className={`flex h-36 items-center justify-center bg-gradient-to-br ${l.accent}`}>
                <span className="font-display text-2xl font-black text-ink/75">{l.name}</span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-base font-extrabold">{l.name}</h3>
                <p className="mt-1 line-clamp-2 text-sm text-foreground/70">{l.tagline}</p>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-cream-deep p-3">
                    <div className="flex items-center gap-2">
                      <img src={iconHandshake} alt="" width={20} height={20} className="h-5 w-5" loading="lazy" />
                      <span className="text-xl font-black">{l.expected}</span>
                    </div>
                    <p className="mt-0.5 text-[11px] font-medium uppercase tracking-wider text-foreground/60">
                      Expected upvotes
                    </p>
                  </div>
                  <div className="rounded-xl bg-brand-soft p-3">
                    <div className="flex items-center gap-2">
                      <img src={iconLaunch} alt="" width={20} height={20} className="h-5 w-5" loading="lazy" />
                      <span className="text-xl font-black text-brand">{l.verified}</span>
                    </div>
                    <p className="mt-0.5 text-[11px] font-medium uppercase tracking-wider text-foreground/70">
                      Verified upvotes
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-2 border-t border-border/60 pt-3 text-xs text-foreground/60">
                  <span className="inline-block h-5 w-5 rounded-full bg-gradient-to-br from-brand to-rose-400" />
                  <span className="font-medium text-foreground/80">{l.author}</span>
                  <span>·</span>
                  <span>Launched on PH</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
