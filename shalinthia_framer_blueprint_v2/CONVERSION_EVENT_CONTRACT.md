# Conversion Event Contract

**Status:** READY FOR SHALINTHIA REVIEW  
**Version:** 1.0  
**Scope:** August 2026 website acquisition and conversion events. This contract does not authorize publication, credentials, CRM configuration, or new page work.

## Principles

- Measurement follows `RAW DATA → VALIDATION → TRUSTED DATA → REVENUE DECISION`.
- Behavioral interactions are never treated as pipeline or revenue truth.
- Browser events are `raw`; a trusted bridge or system-of-record is required for `validated` and `trusted` business states.
- Event names are uppercase and immutable. Version changes require a new `event_version`.
- Do not include message bodies, full calculator inputs, financial amounts, email address, phone number, or other direct PII in analytics events. Keep those only in the secured lead-routing payload when necessary.

## Standard event envelope

```json
{
  "event_id": "uuid-v4",
  "event_name": "HDFC_CALCULATOR_STARTED",
  "event_version": "1.0",
  "occurred_at": "2026-08-20T00:00:00.000Z",
  "source_system": "browser",
  "session_id": "first-party-random-id",
  "anonymous_user_id": "first-party-random-id",
  "contact_id": null,
  "attribution": {
    "first_touch": {"source": null, "medium": null, "campaign": null, "content": null, "term": null},
    "latest_touch": {"source": null, "medium": null, "campaign": null, "content": null, "term": null}
  },
  "page": {"url": "https://example/path", "path": "/path", "referrer": null},
  "properties": {},
  "validation": {"state": "raw", "reason": null}
}
```

Envelope requirements: `event_id`, `event_name`, `event_version`, `occurred_at`, `source_system`, `session_id`, `anonymous_user_id`, `page.path`, and `validation.state`. Generate `event_id` once per user action and reuse it through retries and downstream routing.

## Attribution and identity

- Persist first known UTM/referrer/landing-page attribution in a first-party, consent-aware store; never replace it with a later direct visit.
- Store latest-touch separately at each event.
- The lead bridge may add a CRM contact ID only after a positive CRM acceptance response.
- Use `event_id` for idempotency; use an HMAC or server-side idempotency key for bridge/CRM delivery. Browser-only dedupe is advisory, not trusted.

## Event definitions

All events receive the standard envelope. Destinations are **planned** until a secure configuration is verified.

| Event | Category / state | Exact trigger | Additional required properties | Authority / destination | Failure, retry, duplicate, privacy |
|---|---|---|---|---|---|
| `SELLER_RESOURCE_REQUESTED` | Behavioral / raw | Visitor submits a completed request for a named seller resource. | `resource_name`, `seller_intent`, `property_type`, `neighborhood` when supplied | Browser → analytics; bridge if form accepted | Queue once in browser; no lead claim. Deduplicate by `event_id`; no PII in analytics. |
| `SELLER_LEAD_CREATED` | Conversion / raw | Secure lead bridge acknowledges acceptance of a seller-resource or seller-contact payload. | `resource_name`, `seller_intent`, `property_type`, `neighborhood`, `crm_contact_id` if returned | Lead bridge → CRM + server analytics | No acknowledgment means no event. Bridge retries bounded to 3 with idempotency key; PII only in bridge/CRM. |
| `SELLER_LEAD_VALIDATED` | Validated business / validated | Authorized operator or CRM workflow confirms a legitimate non-test seller inquiry. | `lead_validation_state`, `validation_reason`, `crm_contact_id` | Lofty is authority; CRM/server analytics | Manual/system validation only; no browser retry. Exclude junk/test/duplicates. |
| `SELLER_CONVERSATION_QUALIFIED` | Trusted business / trusted | Authorized qualification process records a seller conversation as qualified under approved criteria. | `seller_intent`, `property_type`, `neighborhood`, `crm_contact_id`, `qualification_version` | Lofty is authority; revenue analytics | Never browser-fired. Deduplicate by CRM business-event ID; minimal operational fields. |
| `WHATSAPP_STARTED` | Behavioral / raw | Visitor activates a WhatsApp link. | `resource_name` when present, `seller_intent` when selected | Browser → analytics | Link click only; no confirmation of message sent. One event per click `event_id`; no PII. |
| `CONSULTATION_REQUESTED` | Conversion / raw | Secure form/bridge acknowledges a consultation-request payload. | `consultation_state="requested"`, `seller_intent`, `property_type`, `neighborhood`, `crm_contact_id` if returned | Bridge → Lofty + analytics | No acknowledgment means no conversion. 3 bounded retries; server dedupe. |
| `CONSULTATION_BOOKED` | Trusted business / trusted | Scheduling/CRM system confirms an appointment booking. | `consultation_state="booked"`, `crm_contact_id`, `booking_source` | Scheduling system/Lofty authority → revenue analytics | Never infer from Calendly click. Provider retry/webhook only; dedupe booking ID. |
| `HOME_VALUATION_REQUESTED` | Conversion / raw | Secure bridge acknowledges a valuation-request payload. | `property_type`, `neighborhood`, `seller_intent`, `crm_contact_id` if returned | Bridge → Lofty + analytics | Same acknowledgment/idempotency rules as seller lead. |
| `QUIZ_STARTED` | Behavioral / raw | Visitor makes the first meaningful quiz selection. | `quiz_name`, `quiz_version` | Browser → analytics | Session-level debounce; do not collect answers in analytics. |
| `QUIZ_COMPLETED` | Behavioral / raw | All required quiz inputs validate and result is calculated. | `quiz_name`, `quiz_version`, `quiz_result` (coarse non-PII state) | Browser → analytics | Once per `session_id + quiz_name + result`; no lead implication. |
| `QUIZ_RECOMMENDATION_CLICKED` | Behavioral / raw | Visitor activates a quiz recommendation CTA. | `quiz_name`, `quiz_result`, `resource_name` or `recommendation_id` | Browser → analytics | Click does not prove downstream completion. |
| `BLUEPRINT_QUALIFICATION_STARTED` | Behavioral / raw | Visitor begins the first required Blueprint qualification field. | `property_type`, `neighborhood` when selected | Browser → analytics | Session debounce; do not send qualification answers to analytics. |
| `HDFC_CALCULATOR_STARTED` | Behavioral / raw | Visitor selects a building or begins the first calculator-required input. | `resource_name="HDFC Readiness Calculator"`, `hdfc_interest=true` | Browser → analytics | Once per `session_id + calculator version`; no PII/financial data. |
| `HDFC_CALCULATOR_COMPLETED` | Behavioral / raw | Required building, household, income, price, and funds inputs validate and calculation succeeds. | `resource_name`, `calculator_result_state`, `hdfc_interest=true` | Browser → analytics | Do not send values/caps. Once per calculated result state/session. |
| `HDFC_RESULT_VIEWED` | Behavioral / raw | Calculated result section becomes visible after successful calculation. | `calculator_result_state`, `resource_name` | Browser → analytics | Fire after visible result only; session/result dedupe. |
| `HDFC_GUIDE_REQUESTED` | Behavioral / raw | Visitor activates a guide request/access action. | `resource_name="HDFC Guide"`, `hdfc_interest=true` | Browser → analytics; bridge only if a form is accepted | Click/request is not lead creation. |
| `HDFC_READINESS_REVIEW_REQUESTED` | Conversion / raw | Secure bridge acknowledges an explicit readiness-review request. | `resource_name`, `hdfc_interest=true`, `calculator_result_state`, `crm_contact_id` if returned | Bridge → Lofty + analytics | Positive bridge acknowledgment required; 3 bounded retries; server dedupe. |
| `HDFC_LEAD_CREATED` | Conversion / validated | Lead bridge receives positive downstream acceptance and a route/CRM receipt. | `resource_name`, `calculator_result_state`, `crm_contact_id`, `lead_validation_state="accepted"` | Lead bridge/Lofty authority → analytics | **Never fire on browser request attempt.** No receipt = no event; bridge retries with idempotency key. |

## Destination policy

- **Browser/Framer analytics:** behavioral raw events only; may receive coarse conversion intent after acknowledgement, never unnecessary PII.
- **Secure bridge:** authoritative transport receipt and validation-state transition for accepted form/lead events.
- **Lofty:** planned system of record for contact, seller validation, qualification, and booked-consultation states. Mapping is not verified.
- **Revenue reporting:** consumes only validated/trusted Lofty or bridge-receipt events.

## Implementation status

No events are currently instrumented by this contract. Existing Framer analytics native page/click/form records are not equivalent to these named events.
