# HDFC Secure Lead Bridge Specification

**Status:** MANUAL_SECURE_CONFIGURATION_REQUIRED  
**Scope:** `/resources` embedded HDFC Readiness Calculator. No live credentials, endpoint changes, or publication are authorized by this specification.

## Current verified behavior

| Area | Verified current state |
|---|---|
| Browser request | Client-side `POST` to a configured `script.google.com` Apps Script endpoint. Endpoint path is intentionally omitted from this document. |
| Request headers | `Content-Type: text/plain`. |
| Request mode | `no-cors`; browser receives an opaque response and cannot verify acceptance or failure. |
| Payload | Timestamp, name, email, optional phone, selected building/not-listed state, household size, annual-income input, liquid-funds input, purchase-price input, calculated cap/down-payment values, result tier, validation flags, and manual-review note. |
| Client validation | Building required; household size and income required; purchase price and liquid funds required; name and email required before lead submit. |
| Result behavior | Calculator computes and renders the educational readiness result **before** delivery is confirmed. |
| Error behavior | Field validation errors are shown. Network failures are only logged to the browser console; there is no user-facing endpoint failure state. |
| Current CTA | Result includes a Calendly link. A click does not prove a booking. |
| Current endpoint ownership | `OWNER_VERIFICATION_REQUIRED`. A configured public endpoint does not establish ownership, access control, or downstream destination. |
| CRM / Lofty / n8n evidence | No Lofty API, Lofty webhook, n8n workflow, CRM field mapping, acknowledgement, or transaction receipt was found in the Framer project source. |

## Current delivery chain and confidence

`Browser → Google Apps Script endpoint → unknown downstream`

Current delivery confidence is **unverified**. The browser may attempt a request, but `no-cors` prevents response inspection; no source evidence establishes CRM creation. Therefore:

- Do not claim CRM-ready delivery.
- Do not emit `HDFC_LEAD_CREATED` from the calculator request attempt.
- Do not show a confirmed delivery success state from the current fetch promise.

## Minimum secure target architecture

```text
HDFC Calculator
  → HTTPS POST to managed lead bridge
  → schema validation + normalization + sanitization
  → abuse/rate-limit check + consent-aware attribution read
  → idempotency/deduplication check
  → create HDFC_CALCULATOR / review-request events
  → Lofty contact/lead routing
  → persist delivery receipt and CRM contact ID
  → JSON acknowledgement to browser
  → confirmed success or recoverable failure UI
```

An existing approved n8n workflow may serve as the managed bridge only after owner verification and secure configuration. Do not introduce another SaaS service solely for this flow.

## Secure request/response contract

### Browser request

- `POST` JSON to a managed HTTPS endpoint under authorized ownership.
- Include a client-generated `event_id`, calculator version, non-PII attribution context, and an HDFC lead payload.
- Keep endpoint secrets, CRM tokens, Apps Script credentials, and webhook secrets server-side.
- Validate fields client-side for usability and server-side for trust.

### Positive response

Only after lead routing is accepted:

```json
{
  "accepted": true,
  "event_id": "same-idempotency-id",
  "lead_receipt_id": "opaque-server-id",
  "crm_contact_id": "optional-opaque-id"
}
```

Browser behavior: show the delivery-confirmed success message, emit `HDFC_LEAD_CREATED`, and retain the receipt only as needed for duplicate protection.

### Negative response

```json
{
  "accepted": false,
  "code": "TEMPORARY_UNAVAILABLE",
  "message": "We could not send your request right now. Please try again or contact Shalinthia directly."
}
```

Browser behavior: do not show false success; retain user inputs locally only for the active session when appropriate; offer retry/contact recovery without exposing system details.

## UX state requirements

| State | Required behavior |
|---|---|
| Submitting | Disable duplicate submission and present deterministic in-progress feedback. |
| Valid input failure | Show the relevant existing field correction. |
| Accepted delivery | Show confirmed request delivery only after bridge acknowledgement. |
| Network/endpoint failure | No false success; provide retry and direct-contact recovery. |
| Duplicate | Return existing receipt/accepted status rather than creating a duplicate CRM record. |

## Duplicate, retry, and validation controls

- Browser submits one `event_id` per action; the bridge persists it before routing.
- Bridge idempotency key: `event_id`; fallback duplicate heuristic uses normalized email + calculator action + bounded time window, reviewed before suppression.
- Retry only transient bridge/CRM failures: maximum 3 attempts with bounded exponential backoff. Never automatically retry invalid payloads.
- Reject/flag malformed input, test records, excessive requests, and obvious spam before CRM routing.
- Separate educational calculator result from lead acceptance. No calculator tier establishes eligibility, lender approval, board approval, or HDFC qualification.

## Required Lofty mapping (not verified)

| Bridge field | Lofty requirement |
|---|---|
| Name, email, optional phone | Contact identity with normalized duplicate rules. |
| Acquisition/first/latest touch | Contact source and campaign fields without overwriting first touch. |
| `resource_name` / `hdfc_interest` | Source context and HDFC interest. |
| Building selection / manual review state | Property/building context, stored only with approved privacy policy. |
| Calculator result state | Coarse educational result; not an eligibility determination. |
| `event_id`, receipt, CRM contact ID | Idempotency and delivery audit trail. |

## Security review

**Result:** `MANUAL_SECURE_CONFIGURATION_REQUIRED`

Required before production activation:

- verified endpoint owner and operator;
- managed endpoint with server-side validation, rate limit, logging, and retention policy;
- CORS limited to approved origin(s) when browser response is required;
- bot/spam protection appropriate to the approved stack;
- secure secret storage for all bridge/CRM credentials;
- documented PII handling and access control;
- authenticated/verified downstream delivery receipt;
- API test evidence for accepted, rejected, duplicate, and transient-failure responses.

## Test plan

1. Invalid step inputs show existing validation errors and emit no lead-created event.
2. Valid calculator completion emits only raw HDFC behavioral events.
3. Valid readiness request receives a positive test acknowledgement and emits `HDFC_LEAD_CREATED` exactly once.
4. Endpoint/network failure shows recovery UI and emits no lead-created event.
5. Reusing the same `event_id` returns the same receipt and produces no duplicate CRM contact.
6. Confirm Lofty contact, source mapping, event receipt, and audit log through an authorized test environment.

## Current block

`BLOCKED — OWNER/SECURE CONFIGURATION REQUIRED`

Missing evidence: endpoint ownership, managed bridge configuration, CRM/Lofty mapping, positive acknowledgement contract, and authorized API test access.
