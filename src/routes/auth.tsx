import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { AppNav } from "@/components/app/AppNav";
import { useUser } from "@/hooks/use-session";

export const Route = createFileRoute("/auth")({
  validateSearch: (s: Record<string, unknown>) => ({
    mode: s.mode === "signup" ? ("signup" as const) : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Sign in — LaunchPact" },
      { name: "description", content: "Sign in or create your LaunchPact account to form launch pacts." },
      { property: "og:title", content: "Sign in — LaunchPact" },
      { property: "og:description", content: "Join founders forming mutual upvote pacts for Product Hunt." },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const search = Route.useSearch();
  const [mode, setMode] = useState<"signin" | "signup">(search.mode === "signup" ? "signup" : "signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();
  const { user } = useUser();

  useEffect(() => {
    if (user) navigate({ to: "/dashboard" });
  }, [user, navigate]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    if (mode === "signup") {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: window.location.origin + "/dashboard", data: { full_name: name } },
      });
      if (error) toast.error(error.message);
      else if (!data.session) toast.success("Check your email to confirm your account.");
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) toast.error(error.message);
    }
    setBusy(false);
  }

  async function google() {
    const r = await lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin + "/auth" });
    if (r.error) toast.error(String(r.error.message ?? r.error));
  }

  return (
    <div className="min-h-screen bg-background">
      <AppNav />
      <div className="mx-auto max-w-md px-4 py-16">
        <div className="rounded-3xl border-2 border-ink/10 bg-card p-8 pixel-shadow-sm">
          <h1 className="text-3xl font-black tracking-tight">
            {mode === "signup" ? "Join the crew" : "Welcome back"}
          </h1>
          <p className="mt-2 text-sm text-foreground/70">
            {mode === "signup" ? "List free · first 10 pacts included." : "Sign in to manage your pacts."}
          </p>
          <button onClick={google} className="mt-6 w-full rounded-xl border-2 border-ink/15 bg-background py-3 text-sm font-semibold hover:bg-cream-deep">
            Continue with Google
          </button>
          <div className="my-5 text-center text-xs text-foreground/50">or</div>
          <form onSubmit={submit} className="space-y-3">
            {mode === "signup" && (
              <input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" className="w-full rounded-xl border-2 border-ink/10 bg-background px-4 py-3 text-sm outline-none focus:border-brand" />
            )}
            <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full rounded-xl border-2 border-ink/10 bg-background px-4 py-3 text-sm outline-none focus:border-brand" />
            <input required type="password" minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="w-full rounded-xl border-2 border-ink/10 bg-background px-4 py-3 text-sm outline-none focus:border-brand" />
            <button disabled={busy} className="w-full rounded-xl bg-brand py-3 text-sm font-semibold text-brand-foreground disabled:opacity-60">
              {busy ? "…" : mode === "signup" ? "Create account" : "Sign in"}
            </button>
          </form>
          <button onClick={() => setMode(mode === "signup" ? "signin" : "signup")} className="mt-5 w-full text-center text-sm text-brand hover:underline">
            {mode === "signup" ? "Already have an account? Sign in" : "New here? Create an account"}
          </button>
        </div>
      </div>
    </div>
  );
}
