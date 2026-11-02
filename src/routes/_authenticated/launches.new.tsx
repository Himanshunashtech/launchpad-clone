import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { AppNav } from "@/components/app/AppNav";

const categories = ["AI", "SaaS", "Developer Tools", "Productivity", "Design", "Marketing", "Other"];

export const Route = createFileRoute("/_authenticated/launches/new")({
  head: () => ({
    meta: [
      { title: "List your launch — LaunchPact" },
      { name: "description", content: "Add your Product Hunt launch date and start forming pacts." },
      { property: "og:title", content: "List your launch — LaunchPact" },
      { property: "og:description", content: "Add your Product Hunt launch and find your crew." },
    ],
  }),
  component: NewLaunch,
});

function NewLaunch() {
  const { user } = Route.useRouteContext();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [busy, setBusy] = useState(false);
  const [f, setF] = useState({
    name: "",
    tagline: "",
    description: "",
    website_url: "",
    category: "SaaS",
    launch_date: "",
  });
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setF({ ...f, [k]: e.target.value });

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    const author = (user.user_metadata?.full_name as string) || user.email?.split("@")[0] || "Founder";
    const { data, error } = await supabase
      .from("launches")
      .insert({ ...f, user_id: user.id, author_name: author })
      .select("id")
      .single();
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success("Launch listed! Now back others to form pacts.");
    qc.invalidateQueries();
    navigate({ to: "/launches/$id", params: { id: data.id } });
  }

  const input = "w-full rounded-xl border-2 border-ink/10 bg-background px-4 py-3 text-sm outline-none focus:border-brand";
  return (
    <div className="min-h-screen bg-background">
      <AppNav />
      <div className="mx-auto max-w-2xl px-4 py-14">
        <h1 className="text-4xl font-black tracking-tight">List your <span className="text-brand">launch</span></h1>
        <p className="mt-2 text-foreground/70">Free · first 10 pacts included.</p>
        <form onSubmit={submit} className="mt-8 space-y-4 rounded-3xl border-2 border-ink/10 bg-card p-8">
          <label className="block text-sm font-semibold">Product name<input required maxLength={80} value={f.name} onChange={set("name")} className={input + " mt-1"} /></label>
          <label className="block text-sm font-semibold">One-liner<input required maxLength={160} value={f.tagline} onChange={set("tagline")} className={input + " mt-1"} /></label>
          <label className="block text-sm font-semibold">Description<textarea maxLength={2000} rows={4} value={f.description} onChange={set("description")} className={input + " mt-1"} /></label>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm font-semibold">PH launch date<input required type="date" value={f.launch_date} onChange={set("launch_date")} className={input + " mt-1"} /></label>
            <label className="block text-sm font-semibold">Category
              <select value={f.category} onChange={set("category")} className={input + " mt-1"}>
                {categories.map((c) => <option key={c}>{c}</option>)}
              </select>
            </label>
          </div>
          <label className="block text-sm font-semibold">Website<input type="url" placeholder="https://" value={f.website_url} onChange={set("website_url")} className={input + " mt-1"} /></label>
          <button disabled={busy} className="w-full rounded-xl bg-brand py-3.5 font-semibold text-brand-foreground disabled:opacity-60">
            {busy ? "Listing…" : "List my launch"}
          </button>
        </form>
      </div>
    </div>
  );
}
