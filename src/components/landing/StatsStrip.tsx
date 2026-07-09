import iconLaunch from "@/assets/icon-launch.png";
import iconUpvote from "@/assets/icon-upvote.png";
import iconTogether from "@/assets/icon-together.png";
import iconFree from "@/assets/icon-free.png";

const stats = [
  { icon: iconLaunch, title: "Launch", sub: "List it. Back others. Show up." },
  { icon: iconUpvote, title: "Upvoted", sub: "Real momentum on PH day" },
  { icon: iconTogether, title: "Together", sub: "Founders backing founders" },
  { icon: iconFree, title: "Free", sub: "List free · 10 pacts included" },
];

export function StatsStrip() {
  return (
    <section className="border-y border-border/60 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-14">
        <p className="text-center text-xs font-bold uppercase tracking-[0.25em] text-foreground/50">
          Launch today. Get upvoted. Shine together.
        </p>
        <div className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.title} className="flex flex-col items-center text-center">
              <img src={s.icon} alt="" width={72} height={72} loading="lazy" className="h-16 w-16" />
              <h3 className="mt-3 text-lg font-extrabold">{s.title}</h3>
              <p className="mt-1 text-sm text-foreground/70">{s.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
