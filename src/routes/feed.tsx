import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { AppNav } from "@/components/app/AppNav";
import { LaunchCard } from "@/components/app/LaunchCard";
import { launchesQuery, myPactDataQuery } from "@/lib/launch-queries";
import { pactStatus, daysUntil } from "@/lib/pacts";
import { useUser } from "@/hooks/use-session";
import { useBacking } from "@/hooks/use-backing";

export const Route = createFileRoute("/feed")({
  head: () => ({
    meta: [
      { title: "Pact feed — Upcoming Product Hunt launches | LaunchPact" },
      { name: "description", content: "Browse upcoming Product Hunt launches and back the ones you'd genuinely upvote." },
      { property: "og:title", content: "LaunchPact pact feed" },
      { property: "og:description", content: "Upcoming Product Hunt launches looking for their crew." },
    ],
  }),
  component: FeedPage,
});

function FeedPage() {
  const { user } = useUser();
  const [filter, setFilter] = useState<"upcoming" | "all">("upcoming");
  const { data: launches = [], isLoading } = useQuery(launchesQuery());
  const { data: pd } = useQuery(myPactDataQuery(user?.id ?? null));
  const { toggle, busy } = useBacking(user?.id ?? null);

  const list = filter === "upcoming" ? launches.filter((l) => daysUntil(l.launch_date) >= 0) : launches;

  return (
    <div className="min-h-screen bg-background">
      <AppNav />
      <div className="mx-auto max-w-7xl px-4 py-14">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-brand">Product Hunt · Pact feed</p>
            <h1 className="mt-2 text-4xl font-black tracking-tight">Find your launch crew</h1>
            <p className="mt-2 max-w-xl text-foreground/70">Back launches you'd genuinely upvote. When they back yours, a pact forms.</p>
          </div>
          <div className="flex gap-2">
            {(["upcoming", "all"] as const).map((f) => (
              <button key={f} onClick={() => setFilter(f)} className={`rounded-full px-4 py-2 text-sm font-semibold ${filter === f ? "bg-ink text-background" : "border-2 border-ink/10"}`}>
                {f === "upcoming" ? "Upcoming" : "All"}
              </button>
            ))}
          </div>
        </div>

        {isLoading ? (
          <p className="mt-12 text-foreground/60">Loading launches…</p>
        ) : list.length === 0 ? (
          <div className="mt-12 rounded-2xl border-2 border-dashed border-ink/15 p-12 text-center">
            <p className="font-semibold">No launches yet.</p>
            <Link to="/launches/new" className="mt-4 inline-flex rounded-xl bg-brand px-5 py-3 text-sm font-semibold text-brand-foreground">
              Be the first — list your launch
            </Link>
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((l) => {
              const st = pactStatus(l, user?.id ?? null, pd?.myBacked ?? new Set(), pd?.backersOfMine ?? new Set());
              return (
                <LaunchCard key={l.id} launch={l} status={st} busy={busy} onToggle={() => toggle(l.id, st === "backed" || st === "pact")} />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
