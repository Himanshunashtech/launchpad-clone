import rooftop from "@/assets/founder-rooftop.jpg";

const bullets = [
  "It's hard to get early upvotes.",
  "Asking for upvotes feels uncomfortable.",
  "Discord & Reddit groups are chaotic and unreliable.",
  "No accountability. People flake.",
];

export function Problem() {
  return (
    <section className="bg-cream-deep">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-24 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-brand">The problem</p>
          <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
            Product Hunt is tough.
          </h2>
          <p className="mt-5 max-w-xl text-lg text-foreground/75">
            You can build an amazing product, but without momentum on launch day, it gets lost.
          </p>
          <ul className="mt-6 space-y-3">
            {bullets.map((b) => (
              <li key={b} className="flex gap-3 text-foreground/85">
                <span className="mt-1 inline-block h-2 w-2 shrink-0 bg-brand" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-lg font-semibold">
            Result? Incredible products go unseen.
          </p>
        </div>

        <div className="relative">
          <div className="rounded-3xl border-4 border-ink/90 bg-white p-2 pixel-shadow">
            <img
              src={rooftop}
              alt='Pixel art founder on a rooftop thinking: "I built this. Why is no one seeing it?"'
              width={1400}
              height={1000}
              loading="lazy"
              className="rounded-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
