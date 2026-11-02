import { Link, useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import logoRocket from "@/assets/logo-rocket.png";
import { supabase } from "@/integrations/supabase/client";
import { useUser } from "@/hooks/use-session";

export function AppNav() {
  const { user } = useUser();
  const navigate = useNavigate();
  const qc = useQueryClient();

  async function signOut() {
    await qc.cancelQueries();
    qc.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <img src={logoRocket} alt="LaunchPact" width={32} height={32} className="h-8 w-8" />
          <span className="text-lg font-extrabold tracking-tight">LaunchPact</span>
        </Link>
        <nav className="hidden items-center gap-7 md:flex">
          <Link to="/feed" className="text-sm font-medium text-foreground/80 hover:text-foreground" activeProps={{ className: "text-brand" }}>
            Pact feed
          </Link>
          {user && (
            <Link to="/dashboard" className="text-sm font-medium text-foreground/80 hover:text-foreground" activeProps={{ className: "text-brand" }}>
              Dashboard
            </Link>
          )}
          <a href="/#how-it-works" className="text-sm font-medium text-foreground/80 hover:text-foreground">
            How it works
          </a>
        </nav>
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <Link to="/launches/new" className="hidden rounded-full bg-brand px-4 py-2 text-sm font-semibold text-brand-foreground hover:opacity-90 sm:inline-flex">
                List launch
              </Link>
              <button onClick={signOut} className="text-sm font-medium text-foreground/70 hover:text-foreground">
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link to="/auth" className="hidden text-sm font-medium text-foreground/80 hover:text-foreground sm:inline">
                Sign in
              </Link>
              <Link to="/auth" search={{ mode: "signup" }} className="inline-flex items-center rounded-full bg-brand px-4 py-2 text-sm font-semibold text-brand-foreground shadow-sm hover:opacity-90">
                Get started
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
