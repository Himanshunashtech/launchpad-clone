import logoRocket from "@/assets/logo-rocket.png";

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-background">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 py-10 sm:flex-row">
        <div className="flex items-center gap-2">
          <img src={logoRocket} alt="LaunchPact" width={28} height={28} className="h-7 w-7" />
          <span className="font-extrabold tracking-tight">LaunchPact</span>
          <span className="ml-3 text-sm text-foreground/60">Launch together. Climb together.</span>
        </div>
        <div className="flex items-center gap-6 text-sm text-foreground/70">
          <a href="#how-it-works" className="hover:text-foreground">How it works</a>
          <a href="#feed" className="hover:text-foreground">Feed</a>
          <a href="#signup" className="hover:text-foreground">Sign up</a>
        </div>
        <p className="text-xs text-foreground/50">© {new Date().getFullYear()} LaunchPact</p>
      </div>
    </footer>
  );
}
