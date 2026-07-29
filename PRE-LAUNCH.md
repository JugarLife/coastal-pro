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

- [ ] **Hero image is Cradle Mountain, Tasmania.** `public/hero-bg.jpg`.
      Any local will recognise it, three scrolls above "We live and work on
      the Peninsula." Reshoot at Cape Schanck, Bushrangers Bay or the
      Sorrento back beach road, at dusk.

- [ ] **ABN is a placeholder** (`12 345 678 901`) in `app/page.tsx` and
      `/terms`.

- [ ] **Confirm the contact email.** Currently `coastalpropertycare@outlook.com`
      — the brochure renders ambiguously.

## Blocking — functional

- [ ] **Enquiries reach nobody.** Set `RESEND_API_KEY` and `ENQUIRY_TO` in
      Vercel. Until then `/api/enquiry` validates and logs only, and returns
      `delivered:false`. Send a real test enquiry after setting them.

- [ ] **Team photograph** placeholder in the "Who we are" section. Two people,
      branded ute, coastal light, mid-morning. Mid-work and slightly candid,
      not smiling at camera. Wide cinematic crop.

- [ ] **Team names and qualifications** — one row is filled, the second is
      `[Name]` / `[Trade and qualification]`. Anonymity is the enemy of trust
      for a business built on key access.

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

## Recommended

- [ ] Replace the reconstructed logo with a real vector (SVG/AI/EPS). The
      current assets were rebuilt from a lossy raster with no alpha channel.
- [ ] Analytics — at minimum scroll depth and enquiry-form starts vs completions.
- [ ] Verify the scroll/reveal motion on real devices.
- [ ] Add an OG share image (metadata is wired; no image is set). Use a
      photograph, not the logo.
- [ ] Convert imagery to AVIF/WebP with blur-up placeholders once real photos
      land, and confirm Lighthouse 95+ on mobile.
- [ ] **Domain.** `coastalpropropertycare.com.au` is a mouthful. Prefer
      `coastalpro.com.au`, else `thecoastalpro.com.au` or
      `coastalproperty.care`. The .com.au matters for local trust.

## Verified working

- Enquiry form validation, honeypot, error handling, confirmation state
- Reserve cap enforced server-side, counted from live subscriptions
- Payment routes return 503 while unconfigured; nothing breaks
- Content renders without JS (reveal animation degrades safely)
- Keyboard skip link, `aria-expanded`/`aria-controls` on all disclosures
