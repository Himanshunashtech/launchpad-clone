import logoRocket from "@/assets/logo-rocket.png";

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-background">
      <div className="mx-auto max-w-5xl px-4 py-24 text-center">
        <div className="relative rounded-3xl border-4 border-ink/90 bg-gradient-to-br from-brand-soft via-white to-cream-deep p-10 pixel-shadow sm:p-16">
          <img src={logoRocket} alt="" width={72} height={72} className="mx-auto h-16 w-16" />
          <h2 className="mt-6 text-4xl font-black tracking-tight sm:text-5xl">
            Your next launch deserves a <span className="text-brand">crew.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-foreground/75">
            List free. Match with founders launching near your date. Climb Product Hunt together.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href="#signup"
              className="inline-flex items-center rounded-xl bg-brand px-6 py-3.5 text-base font-semibold text-brand-foreground shadow-[0_6px_0_0_oklch(0.5_0.18_35)] transition-transform hover:-translate-y-0.5"
            >
              Form pacts. Get verified upvotes
            </a>
            <a
              href="#how-it-works"
              className="inline-flex items-center rounded-xl border-2 border-ink/15 bg-white px-6 py-3.5 text-base font-semibold hover:bg-white/80"
            >
              See how it works
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
