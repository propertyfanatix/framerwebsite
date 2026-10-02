# SOS integration

SOS is Shalinthia Miles' operating system. This file tells the Framer builder how shalinthia.com connects to it, using only what SOS implements today. shalinthia.com only sends data in (forms and booking links); it never reads from SOS.

**Status:** SOS's side is IMPLEMENTED and TESTED, not deployed. Nothing here is LIVE_VERIFIED.

## 1. Lead forms

Scope: her ad landing-page seller forms. Whether her other forms (contact, home value, HDFC calculator) feed SOS is her decision (REQUIRES APPROVAL).

Exact field names (SOS ignores others):

- Visible: `first_name`, `last_name`, `email`, `phone`, `property_address`, `unit`, `zip_code`, `neighborhood`, `seller_intent`, `pain_point`, `timeline`, `relationship_to_property`, `message` (2,000 characters max).
- Checkboxes: `consent_email`, `consent_sms`.
- Hidden, fixed value: `consent_language_version` = `SOS-CONSENT-2026-10-v2`.

**Required by SOS:** a valid email or phone. A submission with neither is held for review.

**Never:** a phone-call box (`consent_phone`), or questions about age, family, household or any protected trait.

**Consent:** two separate boxes, never pre-ticked, neither required to submit. The text box goes only where the form has a mobile field. Show these words exactly.

Email box:
> Yes, email me real estate news, listings and market updates from Shalinthia Miles, Licensed Real Estate Salesperson. I can unsubscribe anytime.

Text box:
> Yes, Shalinthia Miles, Licensed Real Estate Salesperson, may text me at the number above about my request, appointments and real estate updates, including marketing texts sent with automated technology. Consent is not a condition of any purchase or service. Message frequency varies. Msg & data rates may apply. Reply STOP to cancel, HELP for help.

Under both:
> Your details are never sold, and your mobile number and text consent are never shared with third parties for marketing purposes. Privacy Policy

"Privacy Policy" links to her privacy page. **NOT LIVE YET:** there's no page yet, and SOS keeps campaigns BLOCKED until its address is set.

Changing any word needs a new version she approves in SOS first.

## 2. Where the form posts

- Framer form › Send to webhook › `https://n8n.shalinthia.com/webhook/sos/framer-lead`. Never `api.soshq.app` directly.
- Set the webhook's signing secret in Framer. Framer sends `framer-signature: sha256=<hex>` and `framer-webhook-submission-id`. SOS checks HMAC-SHA256 of the exact body followed by the submission ID.
- The secret goes only in the Framer form and SOS's server file `deploy/sos-api.env` (`FRAMER_WEBHOOK_SECRET`). Never in page code, the CMS, this repo or chat.
- n8n forwards the exact bytes and, if SOS is down, keeps the submission for replay.
- Unsigned or wrongly signed submissions are held, never processed.

**NOT LIVE YET:** waits on n8n on the SOS server, sos-api at `api.soshq.app`, and the secret on both sides.

## 3. Attribution snippet

The snippet is `integrations/sos/sos-attribution.js` in this repo: an exact copy of SOS's `workflows/framer/sos-attribution.js` (SOS commit 283ffb8, SHA-256 `fd4a2bb871bf0258d5b21d40ba55ef6a7f6e8d57c48d2bc5cadf9503f218f322`). SOS is its source: never edit the copy here; when SOS changes it, copy it again and update this line.

1. Site Settings › General › Custom Code › **End of `<head>`**, all pages: the whole file inside one `<script>` tag.
2. Each landing page's own custom code, **Start of `<head>`**:
   `<script>window.SOS_ATTRIBUTION = { landingPageId: 'LP-STAIRS', formId: 'FORM-STAIRS' };</script>`
   Use the page's theme (STAIRS, MOVE, ASIS, EQUITY, LANDLORD, ESTATE, VIEW, OHP). SOS drops unknown IDs.
3. Send each published page address to the SOS session. **NOT LIVE YET:** none is entered.

What it does:

- Keeps campaign values from the address (`utm_*`, `gclid`, `gbraid`, `wbraid`, `fbclid`, `sos_cid`, `sos_vid`, `sos_crid`) as first and latest touch in the browser. It stores no personal details.
- On submit, fills hidden fields: `campaign_id`, `experiment_id`, `variant_id`, `creative_id`, `utm_*`, the click IDs, `referrer`, `landing_page_id`, `cta_id`, `form_id`, `lead_external_id`, `occurred_at`, `sos_first_touch`, and `test_marker` in test mode. Add these as hidden fields in Framer too.
- Decorates booking links (section 4).

Add nothing else: no Meta Pixel, Conversions API, Google tag or other third-party script.

## 4. Booking buttons

- Ad landing pages: `https://book.shalinthia.com/meeting/HomeSellingConsultation` (the 20-minute phone call first).
- In person: `https://book.shalinthia.com/meeting/HomeListingConsultation`.
- Buyers (including the HDFC calculator): `https://book.shalinthia.com/meeting/BuyerConsultation`.
- Never Calendly or another booking tool: Reservation is her booking app.

The snippet adds `sos_lid`, `sos_cid`, `sos_vid`, `sos_crid` and UTM values to every `book.shalinthia.com` link, so SOS can match bookings to leads. It also adds Reservation's own source code `src`: `googleads` for a Google ad click, `metaads` for a paid Meta click, otherwise `website`. Don't add them by hand; a link that already names its `src` keeps it.

**NOT LIVE YET:** SOS matches bookings only once Reservation sends them signed.

## 5. Client Portal link

Her decision (2026-10-02): clients can register for PropertyFanatix, her client portal, from this site. Follow PropertyFanatix's `docs/FRAMER.md`:

- Navigation item **Client Portal**: **Sign in** → `https://clients.shalinthia.com/signin`; **Create your account** → `https://clients.shalinthia.com/register`.
- Same tab, never in a frame, no PropertyFanatix logo.
- The links carry no `sos_*` or UTM values, lead ID, email or name. The snippet leaves them alone.
- PROPOSED: no form feeds the portal, they share no keys, and the link stays off ad landing pages.

**NOT LIVE YET:** publish on the day the portal goes live.

## 6. Never

- No browser calls to Lofty, HubSpot, SOS, n8n or a Google Apps Script. Leads reach HubSpot and Lofty only through SOS.
- No second webhook on a form (for example, straight to Lofty). Retiring this repo's older Framer-to-Lofty plan is her decision.
- No keys, tokens or secrets in Framer.
- No fields beyond section 1.
- No "Brokered by" line.
- Always: the Shalinthia | eXp Realty co-branded logo in every page footer (`BRAND_2026.md`).

## 7. Test checklist

Use a private window: `?sos_test=1` keeps a browser in test mode until its storage is cleared.

1. Open a published landing page with `?sos_test=1&utm_source=google&utm_medium=cpc&sos_cid=SOS-EXP-001-GOOGLE-SEARCH&sos_vid=V-GOOG-STAIRS&sos_crid=CR-GOOG-STAIRS-01`.
2. In the console, `SOS_ATTRIBUTION_FIELDS(document.querySelector('form'))` shows `test_marker: "TEST_SOS_EXP_001"` and the page's IDs. A booking link carries `sos_lid` and `src=googleads`.
3. Submit with an email and phone you control, both boxes ticked.
4. In SOS: signature `VALID` (`LIVE-FRAMER-SIGNATURE`), attribution `SERVER_VALIDATED` (`LIVE-TRACKING:LP-STAIRS`).
5. HubSpot: `sos_*` properties filled, **SOS Test Record** ticked.
6. Lofty: source **SOS TEST**, tag `TEST_SOS_EXP_001`.
7. Her new-lead alert arrives (`LIVE-FRAMER-E2E`).
8. Fallback drill: stop sos-api, submit a test lead, confirm it replays.

Test leads never count toward her goals.

## Not verified yet

- How Framer's webhook behaves against SOS's code: a flat JSON body keyed by field name and the `framer-signature` check have never run against a real Framer form.
- Whether a Framer form can hold a fixed hidden value (`consent_language_version`) and whether its webhook includes the inputs the snippet adds. SOS's browser test used a plain HTML form.
- The relay address assumes n8n runs at `n8n.shalinthia.com` on the SOS server, which isn't set up yet.
- The portal's final link labels and what its register page does, until the portal is live.
