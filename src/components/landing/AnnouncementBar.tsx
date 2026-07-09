export function AnnouncementBar() {
  return (
    <div className="w-full bg-gradient-to-r from-[oklch(0.28_0.05_260)] via-[oklch(0.35_0.12_40)] to-[oklch(0.55_0.19_35)] text-white text-xs sm:text-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-3 px-4 py-2.5 text-center">
        <span className="hidden sm:inline">📣</span>
        <span className="opacity-95">
          <span className="font-semibold">We just launched.</span> Help us grow the founders network — spread the word to a founder who'd back your launch.
        </span>
        <a
          href="#signup"
          className="ml-2 hidden shrink-0 rounded-md bg-white/95 px-3 py-1 text-xs font-semibold text-ink hover:bg-white sm:inline-flex"
        >
          Join free
        </a>
      </div>
    </div>
  );
}
