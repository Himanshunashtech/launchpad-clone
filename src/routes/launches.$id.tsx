import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { AppNav } from "@/components/app/AppNav";
import { launchQuery, myPactDataQuery } from "@/lib/launch-queries";
import { pactStatus, daysUntil } from "@/lib/pacts";
import { useUser } from "@/hooks/use-session";
import { useBacking } from "@/hooks/use-backing";

export const Route = createFileRoute("/launches/$id")({
  head: () => ({
    meta: [
      { title: "Launch details — LaunchPact" },
      { name: "description", content: "An upcoming Product Hunt launch on LaunchPact. Back it to form a pact." },
      { property: "og:title", content: "Upcoming launch on LaunchPact" },
      { property: "og:description", content: "Back this Product Hunt launch and form a mutual pact." },
    ],
  }),
  component: LaunchPage,
});

function LaunchPage() {
  const { id } = Route.useParams();
  const { user } = useUser();
  const { data: l, isLoading } = useQuery(launchQuery(id));
  const { data: pd } = useQuery(myPactDataQuery(user?.id ?? null));
  const { toggle, busy } = useBacking(user?.id ?? null);

  if (isLoading) return <div className="min-h-screen bg-background"><AppNav /><p className="p-10">Loading…</p></div>;
  if (!l)
    return (
      <div className="min-h-screen bg-background">
        <AppNav />
        <div className="p-10 text-center">
          <p className="font-semibold">Launch not found.</p>
          <Link to="/feed" className="text-brand">Back to feed</Link>
        </div>
      </div>
    );

  const st = pactStatus(l, user?.id ?? null, pd?.myBacked ?? new Set(), pd?.backersOfMine ?? new Set());
  const d = daysUntil(l.launch_date);
  const backed = st === "backed" || st === "pact";

  return (
    <div className="min-h-screen bg-background">
      <AppNav />
      <div className="mx-auto max-w-3xl px-4 py-14">
        <Link to="/feed" className="text-sm text-foreground/60 hover:text-brand">← Pact feed</Link>
        <div className="mt-4 overflow-hidden rounded-3xl border-2 border-ink/10 bg-card">
          <div className="flex h-48 items-center justify-center bg-gradient-to-br from-brand-soft to-cream-deep">
            <span className="text-5xl font-black text-ink/75">{l.name}</span>
          </div>
          <div className="p-8">
            <p className="text-xs font-bold uppercase tracking-widest text-brand">
              {l.category} · {d > 0 ? `Launching in ${d} days` : d === 0 ? "Launching today" : "Launched"} · {l.launch_date}
            </p>
            <h1 className="mt-2 text-3xl font-black">{l.name}</h1>
            <p className="mt-2 text-lg text-foreground/80">{l.tagline}</p>
            {l.description && <p className="mt-5 whitespace-pre-line text-foreground/75">{l.description}</p>}
            <p className="mt-5 text-sm text-foreground/60">By {l.author_name || "Founder"}</p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              {st !== "own" && (
                <button disabled={busy} onClick={() => toggle(l.id, backed)} className="rounded-xl bg-brand px-6 py-3 font-semibold text-brand-foreground disabled:opacity-60">
                  {st === "pact" ? "🤝 Pact formed (un-back)" : backed ? "Backed · un-back" : "Back this launch"}
                </button>
              )}
              {l.website_url && (
                <a href={l.website_url} target="_blank" rel="noreferrer" className="rounded-xl border-2 border-ink/15 px-6 py-3 font-semibold">
                  Visit website
                </a>
              )}
              <span className="text-sm font-semibold text-foreground/70">{l.backings?.length ?? 0} founders will upvote</span>
            </div>
            {st === "backs_you" && <p className="mt-4 text-sm font-semibold text-brand">This founder already backs your launch — back them to lock in a pact.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
