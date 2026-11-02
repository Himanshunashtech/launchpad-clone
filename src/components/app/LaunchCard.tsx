import { Link } from "@tanstack/react-router";
import iconHandshake from "@/assets/icon-handshake-heart.png";
import { daysUntil, type LaunchRow, type PactStatus } from "@/lib/pacts";

const statusLabel: Record<PactStatus, string> = {
  own: "Your launch",
  none: "Back this launch",
  backed: "Backed · waiting for them",
  backs_you: "They back you — back them!",
  pact: "🤝 Pact formed",
};

export function LaunchCard({
  launch,
  status,
  onToggle,
  busy,
}: {
  launch: LaunchRow;
  status: PactStatus;
  onToggle?: () => void;
  busy?: boolean;
}) {
  const d = daysUntil(launch.launch_date);
  const backed = status === "backed" || status === "pact";
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border-2 border-ink/10 bg-card transition hover:border-brand/40">
      <Link to="/launches/$id" params={{ id: launch.id }} className="relative flex h-32 items-center justify-center bg-gradient-to-br from-brand-soft to-cream-deep">
        <span className="font-display text-2xl font-black text-ink/75">{launch.name}</span>
        <span className="absolute right-3 top-3 rounded-full bg-card/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-ink">
          {d > 0 ? `In ${d}d` : d === 0 ? "Today" : "Launched"}
        </span>
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <Link to="/launches/$id" params={{ id: launch.id }} className="text-lg font-extrabold hover:text-brand">
          {launch.name}
        </Link>
        <p className="mt-1 line-clamp-2 text-sm text-foreground/70">{launch.tagline}</p>
        <p className="mt-2 text-xs text-foreground/60">
          {launch.author_name || "Founder"} · {launch.category}
        </p>
        <div className="mt-auto flex items-center justify-between gap-2 border-t border-border/60 pt-4 mt-4">
          <div className="flex items-center gap-2">
            <img src={iconHandshake} alt="" width={22} height={22} className="h-5 w-5" />
            <span className="text-lg font-black text-brand">{launch.backings?.length ?? 0}</span>
          </div>
          {status === "own" ? (
            <span className="text-xs font-semibold text-foreground/60">Your launch</span>
          ) : (
            <button
              disabled={busy || !onToggle}
              onClick={onToggle}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold transition disabled:opacity-60 ${
                status === "pact"
                  ? "bg-brand text-brand-foreground"
                  : backed
                    ? "border-2 border-brand text-brand"
                    : "bg-ink text-background hover:opacity-90"
              }`}
            >
              {statusLabel[status]}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
