import logoRocket from "@/assets/logo-rocket.png";

const links = [
  { label: "How it works", href: "#how-it-works" },
  { label: "Launch checklist", href: "#checklist" },
  { label: "Launch network", href: "#network" },
  { label: "Feed spotlight", href: "#feed" },
  { label: "Launch Intelligence", href: "#intel" },
];

export function Nav() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <a href="#" className="flex items-center gap-2">
          <img src={logoRocket} alt="LaunchPact" width={32} height={32} className="h-8 w-8" />
          <span className="text-lg font-extrabold tracking-tight">LaunchPact</span>
        </a>
        <nav className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-medium text-foreground/80 hover:text-foreground">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a href="#signin" className="hidden text-sm font-medium text-foreground/80 hover:text-foreground sm:inline">
            Sign in
          </a>
          <a
            href="#signup"
            className="inline-flex items-center rounded-full bg-brand px-4 py-2 text-sm font-semibold text-brand-foreground shadow-sm hover:opacity-90"
          >
            Get started
          </a>
        </div>
      </div>
    </header>
  );
}
