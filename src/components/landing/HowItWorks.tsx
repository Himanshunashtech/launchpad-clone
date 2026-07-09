const steps = [
  {
    n: "01",
    title: "List your launch",
    desc: "Add your Product Hunt date, one-liner, and hero image. Free — first 10 pacts included.",
  },
  {
    n: "02",
    title: "Match with your crew",
    desc: "We surface founders launching near your date whose products you'd actually upvote.",
  },
  {
    n: "03",
    title: "Form mutual pacts",
    desc: "Back the ones you love. When they back you, it locks in as a pact — no ghosts, no chaos.",
  },
  {
    n: "04",
    title: "Show up on launch day",
    desc: "Smart reminders + screenshot verification keep everyone honest. Watch your rank climb.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-cream-deep">
      <div className="mx-auto max-w-7xl px-4 py-24">
        <p className="text-center text-xs font-bold uppercase tracking-widest text-brand">How it works</p>
        <h2 className="mx-auto mt-3 max-w-2xl text-center text-4xl font-black tracking-tight sm:text-5xl">
          From launch anxiety to launch <span className="text-brand">crew</span> — in minutes.
        </h2>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <div
              key={s.n}
              className="relative rounded-2xl border-2 border-ink/10 bg-white p-6 pixel-shadow-sm"
            >
              <span className="font-pixel text-xs text-brand">{s.n}</span>
              <h3 className="mt-4 text-lg font-extrabold">{s.title}</h3>
              <p className="mt-2 text-sm text-foreground/70">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
