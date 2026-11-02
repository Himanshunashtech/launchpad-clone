import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { AppNav } from "@/components/app/AppNav";
import { LaunchCard } from "@/components/app/LaunchCard";
import { launchesQuery, myPactDataQuery } from "@/lib/launch-queries";
import { pactStatus, daysUntil, FREE_PACT_LIMIT } from "@/lib/pacts";
import { useBacking } from "@/hooks/use-backing";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — LaunchPact" },
      { name: "description", content: "Your launch, your pacts and launch-day reminders." },
      { property: "og:title", content: "LaunchPact dashboard" },
      { property: "og:description", content: "Track your Product Hunt pacts." },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const { user } = Route.useRouteContext();
  const { data: launches = [] } = useQuery(launchesQuery());
  const { data: pd } = useQuery(myPactDataQuery(user.id));
  const { toggle, busy } = useBacking(user.id);

  const myBacked = pd?.myBacked ?? new Set<string>();
  const backersOfMine = pd?.backersOfMine ?? new Set<string>();
  const withStatus = launches.map((l) => ({ l, st: pactStatus(l, user.id, myBacked, backersOfMine) }));
  const mine = withStatus.filter((x) => x.st === "own");
  const pacts = withStatus.filter((x) => x.st === "pact");
  const waiting = withStatus.filter((x) => x.st === "backed");
  const incoming = withStatus.filter((x) => x.st === "backs_you");
  const reminders = withStatus
    .filter((x) => (x.st === "pact" || x.st === "backed") && daysUntil(x.l.launch_date) >= 0 && daysUntil(x.l.launch_date) <= 7)
    .sort((a, b) => a.l.launch_date.localeCompare(b.l.launch_date));
  const pactCount = new Set(pacts.map((p) => p.l.user_id)).size;

  const stats = [
    { label: "Pacts formed", value: pactCount, sub: `${Math.max(0, FREE_PACT_LIMIT - pactCount)} of ${FREE_PACT_LIMIT} free left` },
    { label: "Backers of you", value: backersOfMine.size },
    { label: "You're backing", value: myBacked.size },
    { label: "Awaiting back", value: waiting.length },
  ];

  const Section = ({ title, items, empty }: { title: string; items: typeof withStatus; empty: string }) => (
    <section className="mt-12">
      <h2 className="text-xl font-extrabold">{title} <span className="text-foreground/40">({items.length})</span></h2>
      {items.length === 0 ? (
        <p className="mt-3 text-sm text-foreground/60">{empty}</p>
      ) : (
        <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(({ l, st }) => (
            <LaunchCard key={l.id} launch={l} status={st} busy={busy} onToggle={() => toggle(l.id, st === "backed" || st === "pact")} />
          ))}
        </div>
      )}
    </section>
  );

  return (
    <div className="min-h-screen bg-background">
      <AppNav />
      <div className="mx-auto max-w-7xl px-4 py-12">
        <p className="text-xs font-bold uppercase tracking-widest text-brand">Dashboard</p>
        <h1 className="mt-2 text-4xl font-black tracking-tight">
          Hey {(user.user_metadata?.full_name as string) || user.email?.split("@")[0]} 👋
        </h1>

        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="rounded-2xl border-2 border-ink/10 bg-card p-5">
              <p className="text-3xl font-black text-brand">{s.value}</p>
              <p className="mt-1 text-sm font-semibold">{s.label}</p>
              {s.sub && <p className="mt-0.5 text-xs text-foreground/60">{s.sub}</p>}
            </div>
          ))}
        </div>

        <section className="mt-10 rounded-2xl border-2 border-brand/30 bg-brand-soft p-6">
          <h2 className="font-extrabold">⏰ Launch-day reminders (next 7 days)</h2>
          {reminders.length === 0 ? (
            <p className="mt-2 text-sm text-foreground/70">No launches you've backed are coming up this week.</p>
          ) : (
            <ul className="mt-3 space-y-2">
              {reminders.map(({ l }) => {
                const d = daysUntil(l.launch_date);
                return (
                  <li key={l.id} className="flex items-center justify-between rounded-xl bg-card px-4 py-3 text-sm">
                    <Link to="/launches/$id" params={{ id: l.id }} className="font-semibold hover:text-brand">{l.name}</Link>
                    <span className="font-bold text-brand">{d === 0 ? "Upvote today!" : `in ${d}d`}</span>
                  </li>
                );
              })}
            </ul>
          )}
        </section>

        <section className="mt-12">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-extrabold">My launches</h2>
            <Link to="/launches/new" className="rounded-xl bg-brand px-4 py-2 text-sm font-semibold text-brand-foreground">+ List launch</Link>
          </div>
          {mine.length === 0 ? (
            <p className="mt-3 text-sm text-foreground/60">You haven't listed a launch yet.</p>
          ) : (
            <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {mine.map(({ l, st }) => <LaunchCard key={l.id} launch={l} status={st} />)}
            </div>
          )}
        </section>

        <Section title="🤝 Pacts" items={pacts} empty="No pacts yet — back launches and get backed back." />
        <Section title="They back you — back them to form a pact" items={incoming} empty="Nobody's waiting on you." />
        <Section title="Waiting for them to back you" items={waiting} empty="Nothing pending." />

        <div className="mt-12 text-center">
          <Link to="/feed" className="font-semibold text-brand hover:underline">Browse the pact feed →</Link>
        </div>
      </div>
    </div>
  );
}
