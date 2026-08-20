# Lofty P0 Integration Specification

**Status:** `BLOCKED — OWNER/SECURE CONFIGURATION REQUIRED`  
**Objective:** Establish one secure acknowledged path: Framer website → managed bridge → Lofty → positive receipt → opaque CRM record ID → trusted lead-created event.

## P0 boundary

- No browser-to-Lofty calls, credentials, endpoints, navigation, URLs, page-copy changes, or publication.
- No claim that the existing Apps Script `no-cors` request creates a CRM record.
- No `HDFC_LEAD_CREATED`, `SELLER_LEAD_CREATED`, `CONSULTATION_REQUESTED`, or `HOME_VALUATION_REQUESTED` event on a browser request attempt alone.

## Required target flow

```text
Framer form
  → managed HTTPS bridge
  → server validation, rate limit, consent-aware attribution, idempotency
  → account-confirmed Lofty lead operation
  → positive Lofty receipt with opaque CRM record ID
  → bridge receipt persistence
  → JSON acknowledgement to browser
  → only then: trusted lead-created event
```

## Account-dependent contract

| Contract item | Required production behavior | Current state |
|---|---|---|
| Authentication | The bridge uses the owner-approved Lofty authentication method server-side. | `UNKNOWN — OWNER CONFIRMATION REQUIRED` |
| Lead operation | Exact supported create/update/upsert operation, payload, duplicate behavior, and account permission are confirmed in a test. | `UNKNOWN — PROVIDER/OWNER CONFIRMATION REQUIRED` |
| Field mapping | Only owner-confirmed destination field IDs and enumerations are sent. | `FIELD_MAPPING_REQUIRES_OWNER_CONFIRMATION` |
| Positive receipt | Bridge accepts success only when the confirmed Lofty response satisfies its documented success condition and contains a record identifier or verified retrieval evidence. | `UNKNOWN — OWNER/PROVIDER CONFIRMATION REQUIRED` |
| CRM record ID | Preserve as an opaque string; do not parse 64-bit IDs as JavaScript numbers. | Required when integration is configured. |
| Duplicate policy | Reuse same `event_id`; confirmed CRM behavior decides create/update/merge. | `UNKNOWN — OWNER CONFIRMATION REQUIRED` |

## Bridge controls

- Accept JSON only over managed HTTPS from approved origin(s); validate again server-side.
- Store Lofty credentials solely in the approved server-side secret manager or managed automation credential store.
- Generate or verify an idempotency key before any CRM call. Persist delivery state and reuse the receipt on a duplicate request.
- Retry transient bridge/CRM failures at most three times with bounded backoff. Do not retry validation, authorization, or deterministic field-mapping failures.
- Log non-secret request correlation, response classification, bridge receipt, and opaque CRM record ID. Do not log raw credentials or unnecessary PII.
- Return user-safe failure responses; never claim accepted delivery without the positive receipt.

## Browser acknowledgement

The finalized bridge response must be JSON and must distinguish accepted, duplicate-accepted, validation failure, and temporary failure. Exact keys wait for the approved bridge implementation, but acceptance must bind the submitted `event_id` to a persisted bridge receipt and opaque CRM record ID or verified retrieval evidence.

## Event transition

1. Browser may record raw behavioral activity using the Conversion Event Contract.
2. Bridge records the secure delivery attempt and validates the payload.
3. Only a positive, verified Lofty receipt transitions the request to a trusted lead-created event.
4. A timeout, opaque browser response, or unverified endpoint result remains untrusted and emits no lead-created event.

## Acceptance tests (blocked pending secure configuration)

| Test | Required evidence |
|---|---|
| Valid controlled test lead | Bridge receipt, confirmed Lofty success condition, opaque CRM record ID, and authorized CRM-side record inspection. |
| Duplicate submission | Same idempotency key returns the original receipt and does not create a second CRM record. |
| Invalid payload | Bridge rejects without a CRM call or trusted event. |
| Unauthorized/insufficient scope | Bridge records safe failure; no browser secrets; no trusted event. |
| Transient CRM failure | Bounded retries, recoverable user response, no false success, and no trusted event before receipt. |

