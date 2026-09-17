# Pre-launch checklist

Everything below must be resolved before a domain is pointed at this site.

## Blocking — legal or credibility risk

- [ ] **Testimonials are invented.** `app/page.tsx` → `TESTIMONIALS`.
      Attributed to named people. Replace with genuine quotes (with written
      permission to use name + suburb) or remove the section. Publishing
      invented attributed testimonials risks breaching s18 of the Australian
      Consumer Law; the ACCC actively pursues fake reviews.

- [ ] **Terms and Privacy are unreviewed drafts.** `/terms`, `/privacy`.
      Have an Australian solicitor settle them — especially keys, access and
      liability. Fill every `[square bracket]`. Remove the draft banner in
      `app/components/LegalPage.tsx` once settled.

- [ ] **Photography resolution.** The Tasmanian hero is GONE — replaced with
      the coastal shot from your own brochure cover, along with three more
      pulled from the brochure (cliff, deck, pool). They are extracted from
      1055px-wide print PNGs, so they are soft at full-bleed sizes even after
      upscaling. They hold under the hero scrim and at band sizes, but:
      supply the ORIGINAL full-resolution files if you have them (ask
      whoever built the brochure), or reshoot at 2560px wide minimum.
      Sources: hero + coast = brochure p.1, cliff = p.2, deck = p.4,
      pool = p.5.

- [ ] **ABN is a placeholder** (`12 345 678 901`) in `app/page.tsx` and
      `/terms`.

- [ ] **Confirm the contact email.** Currently `coastalpropertycare@outlook.com`
      — the brochure renders ambiguously.

## Blocking — functional

- [ ] **Resend domain not verified.** Env vars are set and the key works;
      DNS (MX, SPF, DKIM) is correct and public. Resend reports the domain
      as `not_started` — click "Verify DNS Records" in Resend > Domains.
      Until then Resend refuses to send and enquiries reach nobody.
      Check status any time: GET /api/enquiry on the live site.

- [ ] **Team photograph** placeholder in the "Who we are" section. Two people,
      branded ute, coastal light, mid-morning. Mid-work and slightly candid,
      not smiling at camera. Wide cinematic crop.

- [ ] **Team names and qualifications** — Chris Lacey (builder) is listed but
      still needs a licence number; the second row is `[Name]` /
      `[Trade and qualification]`. Anonymity is the enemy of trust for a
      business built on key access.

- [ ] **Process photography (optional but recommended)** — a hand on a
      downpipe, a phone photographing a deck joint, a laptop with the report
      open. Would let "How it works" become alternating full-bleed rows
      rather than three columns.

## Before taking payment

- [ ] Create three Stripe Products, each with a monthly and an annual Price.
- [ ] Set all `STRIPE_PRICE_*` vars, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`.
- [ ] Register the webhook endpoint at `/api/stripe/webhook`.
- [ ] Confirm the Reserve counter reads live once configured
      (`/api/availability` → `configured: true`).
- [ ] Decide whether Essential gets a direct-Checkout fast lane. Signature and
      Reserve stay consultation-first per the brief.

## Done

- [x] **Domain live** — coastalpropropertycare.com, apex + www, Let's Encrypt
      certificate, www 308-redirects to the bare host. The .net.au has been
      removed from the project entirely.
- [x] **Enquiry environment variables** set in Vercel Production as Sensitive
      (RESEND_API_KEY, ENQUIRY_TO, ENQUIRY_FROM). Note: Sensitive values
      cannot be read back — a lost API key is regenerated, not recovered.
- [x] **Brochure integrated** — all nine pages of content built natively,
      plus per-section PDF downloads (9 of 9 serving).

## Decided — no longer open

- [x] **Top tier is "Premium", not "Reserve".** The 2026 brochure names it
      PREMIUM ("Limited to 5 properties only"), so the site now matches the
      printed collateral. This was the first open question in the project.

- [x] **Tagline is "One call and we organise it all."** Taken from the
      brochure and the vehicle. The exclamation mark is dropped on the site
      to suit its typographic register — say the word if you want it back.

- [x] **Regulatory scope statement is live** on the Specialist Coordination
      section and in the FAQ, verbatim from brochure p.7. Important: it is
      what keeps the "we organise trades" positioning clearly distinct from
      holding licences you do not hold.

## Recommended

- [ ] Replace the reconstructed logo with a real vector (SVG/AI/EPS). The
      current assets were rebuilt from a lossy raster with no alpha channel.
- [ ] Analytics — at minimum scroll depth and enquiry-form starts vs completions.
- [ ] Verify the scroll/reveal motion on real devices.
- [ ] Add an OG share image (metadata is wired; no image is set). Use a
      photograph, not the logo.
- [ ] Convert imagery to AVIF/WebP with blur-up placeholders once real photos
      land, and confirm Lighthouse 95+ on mobile.


## Verified working

- Enquiry form validation, honeypot, error handling, confirmation state
- Reserve cap enforced server-side, counted from live subscriptions
- Payment routes return 503 while unconfigured; nothing breaks
- Content renders without JS (reveal animation degrades safely)
- Keyboard skip link, `aria-expanded`/`aria-controls` on all disclosures
