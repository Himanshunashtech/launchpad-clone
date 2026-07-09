# LaunchPact Homepage Clone

Rebuild the launchpact.io homepage as a single-page site with the same layout, sections, warm cream/orange palette, pixel-art illustration style, and copy.

## Visual system

- **Palette**: cream background (#faf7f2), deep navy text (~#0f172a), signature orange accent (~#f26a2e) for headings/buttons/highlights, soft pixel-sky gradients in hero.
- **Type**: Inter/Geist-style sans for body; large bold display for H1s with the second half in orange (matches original).
- **Illustrations**: pixel-art scenes generated via imagegen (hero founder-at-desk with city skyline sunset; rooftop founder thinking; two astronauts shaking hands on a launch planet). Icon tiles for features/stats generated as small pixel icons.
- **Announcement bar**: top orange-gradient strip with "We just launched…" + Join free button.

## Sections (in order)

1. **Top announcement bar** + sticky nav (LaunchPact logo, links: How it works, Launch checklist, Launch network, Feed spotlight, Launch Intelligence; Sign in + Get started CTA).
2. **Hero**: eyebrow badge "GET UPVOTES FOR YOUR PRODUCT HUNT LAUNCH", H1 ("Launching on Product Hunt alone is brutal." + orange "Launch with a crew that upvotes for real."), subcopy, two CTAs (Form pacts / See how it works), avatar stack + "Founders forming pacts…", "List free · first 10 pacts per launch included". Right side: pixel-art hero illustration of a founder at a desk with laptop showing "Your Product 1234" and city sunset out the window. Pixel clouds + sun in background.
3. **Stats strip**: "Launch today. Get upvoted. Shine together." with 4 icon tiles: Launch / Upvoted / Together / Free.
4. **The problem**: H2 "Product Hunt is tough." bullet list, closing line, pixel rooftop illustration.
5. **The solution**: astronauts illustration + H2 "LaunchPact is your launch fuel." with 4 feature tiles (Mutual Pacts, Verified Upvotes, Trust System, Smart Reminders) + CTA.
6. **Founders already building launch momentum**: grid of upcoming-launch cards (mocked with the sample entries from source) + "List your PH launch date" CTA.
7. **Real founders. Real upvotes. Real results.**: grid of past-launch cards showing expected vs verified upvote counts.
8. **How it works** (#how-it-works anchor): numbered steps section.
9. **Final CTA** + minimal footer.

## Tech

- Single route: replace placeholder in `src/routes/index.tsx` with the full page composed of section components in `src/components/landing/`.
- Update `__root.tsx` head: title "LaunchPact — Get upvotes for your Product Hunt launch", matching description, og tags.
- Fonts via Google Fonts `<link>` in root head (Inter + a display weight); add pixel accent font (e.g. "Press Start 2P") only for tiny decorative labels if needed.
- Tokens in `src/styles.css`: add `--brand`, `--brand-foreground`, `--cream`, `--ink`, gradient tokens. All components use semantic classes only.
- Generate images with `imagegen` (fast tier, pixel-art prompts) into `src/assets/`, then externalize via `lovable-assets`:
  - `hero-desk.png` (1600×1200 pixel art founder-at-desk sunset)
  - `founder-rooftop.png`
  - `solution-astronauts.png`
  - 4 stat icons + 4 feature icons + handshake-heart + rocket badge (transparent PNGs)
- Launch cards use placeholder thumbnails (generated small pixel product tiles) since real Supabase-hosted images from source can't be reused.

## Out of scope

- No auth, no real signup flow — CTAs link to `#` or `/signup` placeholder route not built.
- No backend / no Product Hunt data — content is static mock matching original copy.

## Deliverable

A pixel-perfect visual match of the launchpact.io homepage running at `/`, fully static, responsive, using the design system tokens.
