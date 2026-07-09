import astronauts from "@/assets/solution-astronauts.jpg";
import iconHandshake from "@/assets/icon-handshake-heart.png";
import iconVerified from "@/assets/icon-verified.png";
import iconTrust from "@/assets/icon-trust.png";
import iconReminder from "@/assets/icon-reminder.png";

const features = [
  { icon: iconHandshake, title: "Mutual Pacts", desc: "Formed when both sides back each other" },
  { icon: iconVerified, title: "Verified Upvotes", desc: "Screenshot + AI verification" },
  { icon: iconTrust, title: "Trust System", desc: "Built on honesty. Earn reputation" },
  { icon: iconReminder, title: "Smart Reminders", desc: "Never miss your pact" },
];

export function Solution() {
  return (
    <section className="bg-background">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-24 lg:grid-cols-2 lg:items-center">
        <div className="order-2 lg:order-1">
          <div className="rounded-3xl border-4 border-ink/90 bg-[oklch(0.22_0.08_260)] p-2 pixel-shadow">
            <img
              src={astronauts}
              alt="Two founders in astronaut suits shaking hands on a launch planet with a Product Hunt flag"
              width={1400}
              height={1000}
              loading="lazy"
              className="rounded-2xl"
            />
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <p className="text-xs font-bold uppercase tracking-widest text-brand">The solution</p>
          <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
            LaunchPact is your <span className="text-brand">launch fuel.</span>
          </h2>
          <div className="mt-5 space-y-2 text-lg text-foreground/80">
            <p>A crew of founders launching with you.</p>
            <p>Back the products you'd genuinely upvote.</p>
            <p>When they back yours, you've got a pact.</p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {features.map((f) => (
              <div
                key={f.title}
                className="rounded-2xl border-2 border-ink/10 bg-white p-5 transition hover:border-brand/40 hover:pixel-shadow-sm"
              >
                <img src={f.icon} alt="" width={48} height={48} loading="lazy" className="h-12 w-12" />
                <h3 className="mt-3 text-base font-extrabold">{f.title}</h3>
                <p className="mt-1 text-sm text-foreground/70">{f.desc}</p>
              </div>
            ))}
          </div>

          <a
            href="#signup"
            className="mt-8 inline-flex items-center rounded-xl bg-brand px-6 py-3.5 text-base font-semibold text-brand-foreground shadow-[0_6px_0_0_oklch(0.5_0.18_35)] transition-transform hover:-translate-y-0.5"
          >
            Find your launch crew →
          </a>
        </div>
      </div>
    </section>
  );
}
