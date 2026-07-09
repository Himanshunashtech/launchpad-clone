import heroDesk from "@/assets/hero-desk.jpg";

const avatars = [
  "https://i.pravatar.cc/64?img=12",
  "https://i.pravatar.cc/64?img=32",
  "https://i.pravatar.cc/64?img=45",
  "https://i.pravatar.cc/64?img=58",
  "https://i.pravatar.cc/64?img=15",
];

export function Hero() {
  return (
    <section className="relative overflow-hidden sky-gradient">
      {/* pixel clouds */}
      <PixelClouds />

      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 pt-14 pb-24 lg:grid-cols-2 lg:gap-8 lg:pt-20 lg:pb-32">
        <div className="flex flex-col justify-center">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-brand/30 bg-white/70 px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand">
            <span className="text-brand">▲</span> Get upvotes for your Product Hunt launch
          </span>

          <h1 className="mt-6 text-5xl font-black leading-[1.05] tracking-tight sm:text-6xl">
            Launching on Product Hunt alone is brutal.{" "}
            <span className="text-brand">Launch with a crew that upvotes for real.</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg text-foreground/75">
            LaunchPact matches you with founders launching near your date. Form{" "}
            <span className="font-semibold text-foreground">mutual pacts</span>, show up for each other on launch day, and climb the Product Hunt rankings together.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#signup"
              className="inline-flex items-center rounded-xl bg-brand px-6 py-3.5 text-base font-semibold text-brand-foreground shadow-[0_6px_0_0_oklch(0.5_0.18_35)] transition-transform hover:-translate-y-0.5"
            >
              Form pacts. Get verified upvotes
            </a>
            <a
              href="#how-it-works"
              className="inline-flex items-center rounded-xl border-2 border-ink/15 bg-white/80 px-6 py-3.5 text-base font-semibold text-foreground hover:bg-white"
            >
              See how it works
            </a>
          </div>

          <div className="mt-8 flex items-center gap-3">
            <div className="flex -space-x-2">
              {avatars.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt=""
                  width={36}
                  height={36}
                  loading="lazy"
                  className="h-9 w-9 rounded-full border-2 border-background object-cover"
                />
              ))}
            </div>
            <p className="text-sm text-foreground/75">
              Founders forming <span className="font-semibold">pacts</span> to climb Product Hunt together.
            </p>
          </div>

          <p className="mt-3 flex items-center gap-2 text-sm text-emerald-700">
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-600 text-[10px] font-black text-white">✓</span>
            List free · first 10 pacts per launch included
          </p>
        </div>

        <div className="relative flex items-center justify-center">
          <div className="relative rounded-3xl border-4 border-ink/90 bg-white p-2 pixel-shadow">
            <img
              src={heroDesk}
              alt="Founder at their desk watching their Product Hunt launch climb the rankings"
              width={1600}
              height={1200}
              className="rounded-2xl"
            />
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 text-xs font-semibold uppercase tracking-widest text-foreground/50">
        ↓ Scroll
      </div>
    </section>
  );
}

function PixelClouds() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[340px] overflow-hidden">
      <div className="absolute left-[8%] top-16 h-10 w-24 bg-white/85 [image-rendering:pixelated] [clip-path:polygon(0_50%,10%_50%,10%_30%,30%_30%,30%_10%,70%_10%,70%_30%,90%_30%,90%_50%,100%_50%,100%_100%,0_100%)]" />
      <div className="absolute right-[12%] top-24 h-12 w-32 bg-white/90 [clip-path:polygon(0_50%,10%_50%,10%_30%,30%_30%,30%_10%,70%_10%,70%_30%,90%_30%,90%_50%,100%_50%,100%_100%,0_100%)]" />
      <div className="absolute right-[35%] top-8 h-14 w-14 rounded-full bg-yellow-300 shadow-[0_0_60px_20px_rgba(253,224,71,0.55)]" />
      <div className="absolute left-[45%] top-32 h-8 w-20 bg-white/80 [clip-path:polygon(0_50%,10%_50%,10%_30%,30%_30%,30%_10%,70%_10%,70%_30%,90%_30%,90%_50%,100%_50%,100%_100%,0_100%)]" />
    </div>
  );
}
