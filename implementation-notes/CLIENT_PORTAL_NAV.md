# Client Portal in the navigation, and the links the site shares with her other apps

**Status:** READY TO BUILD IN FRAMER, PUBLISH ONLY ON THE DAY THE PORTAL GOES LIVE.
**Source:** the client portal's repository (`propertyfanatix/PropertyFanatix`, `docs/FRAMER.md`, `docs/DECISIONS.md`), brought here on 2026-10-02 so the Framer build has it.

Her instruction: "an area for clients to register/log-in on the navigation bar". Her standing rule for the site: "a 'Client Portal' button with Sign in and Create account".

## 1. What visitors see

- **At the right end of the navigation bar:** a **Client Portal** item.
- **On desktop,** clicking it opens a small panel. **In the mobile menu,** it opens inline under the item. Either way, it holds:
  - the line **"Your documents, appointments and progress in one place."**
  - **Sign in**, linking to `https://clients.shalinthia.com/signin`;
  - **Create your account**, linking to `https://clients.shalinthia.com/register`.
- The label is **Client Portal**. The name "PropertyFanatix" doesn't appear on shalinthia.com (`homepage-updates/DAY2_VALUE_DIFFERENTIATOR_UPDATE.md`: "Remove all public references to PropertyFanatix"). Her waiver of 2026-10-02 (D82) lets her PropertyFanatix logo appear on her onboarding guide, welcome page and videos, not on this site.
- The portal opens in the same tab. It is never embedded in a Framer frame: its cookies and security policy rule that out.

## 2. Steps in Framer

These follow `FRAMER_BRAND_SYSTEM.md`: reuse the existing **Navigation** component and **Navigation Link** text style, and add no new colors, fonts or buttons. Her instruction is the approval for this one new nav item.

1. Open the site in Framer and select the **Navigation** component (the primary component, not a page instance).
2. Add a last item at the right end of the links, labeled `Client Portal`, with the **Navigation Link** text style.
3. Make it open a small panel on desktop, using the same pattern as any existing dropdown. If there isn't one, use an Overlay set to appear on click, anchored under the item.
   - Inside the panel, put the line above in the **Body** style.
   - Add **Sign in** using the existing primary (Oxblood) button.
   - Add **Create your account** as a text link, or as the existing secondary button if there is one.
4. In the mobile menu variant, add the same item. It opens an inline section with the same line, **Sign in** and **Create your account**, stacked full width.
5. Set both links to open in the same tab: no `target="_blank"`, never embedded.
6. Preview on desktop and on a phone, and share the preview with her.
7. Publish only after she approves it, and only on the day the portal goes live (section 4).

## 3. What the two links do (checked against the portal on 2026-10-02)

- **Sign in** (`/signin`): a passkey first ("Sign in with Face ID, fingerprint or screen lock"), **Continue with Google**, or an email link with a 6-digit code that works once, for 15 minutes. A sign-in never links a deal.
- **Create your account** (`/register`): accounts open by her invitation for now. Her invitation email opens the client portal and lasts 14 days. The page's main button is **Continue with your email**, for someone whose invitation link ran out; it uses the same email address. Her later front door (D65: one "Create your account" screen for everyone, where no invitation opens a property profile) isn't built yet; the link stays the same when it is.
- The portal's own pages carry her "PropertyFanatix by Shalinthia" header. That's inside the portal, not on this site.

## 4. Before the item goes live

- The portal must be live at `clients.shalinthia.com` first (the portal's `docs/GO-LIVE.md`). Until then both links reach a page that isn't there.
- Publish this Framer change on the same day the portal goes live.

## 5. Links this site may use (one home for each)

| What | URL | Rule |
|---|---|---|
| Book a time | `https://book.shalinthia.com/?src=website` | Her booking site (Reservation). `?src=website` is how her dashboard counts bookings from this site. To show it inside a Framer page: Insert > Embed > URL, `https://book.shalinthia.com/?embed=1&src=website`, width Fill, height about 1600px (Reservation's README). It allows framing from shalinthia.com and Framer's own domains. eXp approved its co-brand on 2026-09-29. |
| Refer someone | `https://book.shalinthia.com/referral` | The one referral form (D35). Never build a second referral form in Framer. A thank-you note only, never a reward. |
| Introduced, and can't find the link | `https://book.shalinthia.com/newreferral` | D44. Never "call or text me" there. |
| Leave a review | `https://book.shalinthia.com/testimonial` | D33. Forwards to her Google review box. Never a star rating in the ask. |
| Client Portal: Sign in | `https://clients.shalinthia.com/signin` | Section 3. |
| Client Portal: Create your account | `https://clients.shalinthia.com/register` | Section 3. |
| Onboarding welcome page | `welcome.shalinthia.com` (PROPOSED host) | Unlisted: reached from her invitation email, never linked from this site. |

None of these links needs a new page on this site. Add one only where she asks for it, following `BRAND_HIERARCHY.md`'s visitor-intent rule for CTAs.
