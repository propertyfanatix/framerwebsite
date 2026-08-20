# Lofty P0 Field Mapping

**Status:** `FIELD_MAPPING_REQUIRES_OWNER_CONFIRMATION`  
**Scope:** Minimal website-to-Lofty lead record. This document intentionally does not invent Lofty field names, custom-field IDs, enumerations, routing values, or duplicate rules.

## Mapping rule

The bridge may normalize website input, but it must not write a field until the account owner confirms the exact Lofty destination, allowed value, and retention purpose. All CRM destination fields below are therefore `FIELD_MAPPING_REQUIRES_OWNER_CONFIRMATION`.

| Website/bridge field | Source | Minimum validation or transformation | Lofty destination | Requirement | Privacy / duplicate note |
|---|---|---|---|---|---|
| `first_name` | Lead form when collected | Trim; reject empty. | `FIELD_MAPPING_REQUIRES_OWNER_CONFIRMATION` | Required for the selected Lofty operation if confirmed. | Identity data; never analytics payload. |
| `last_name` | Lead form when collected | Trim; reject empty only if required by confirmed contract. | `FIELD_MAPPING_REQUIRES_OWNER_CONFIRMATION` | Depends on confirmed operation. | Identity data. |
| `full_name` | Existing HDFC calculator | Preserve as submitted. Do not reliably split into first/last name without owner-approved parsing or separate inputs. | `FIELD_MAPPING_REQUIRES_OWNER_CONFIRMATION` | Current calculator source. | Identity data. |
| `email` | Lead form / HDFC calculator | Trim, lowercase domain where safe, validate syntax. | `FIELD_MAPPING_REQUIRES_OWNER_CONFIRMATION` | Required for current HDFC submit validation. | Primary duplicate candidate; never analytics payload. |
| `phone` | Lead form / HDFC calculator | Optional; normalize only to confirmed format. | `FIELD_MAPPING_REQUIRES_OWNER_CONFIRMATION` | Optional. | Identity data; no browser analytics. |
| `lead_intent` | Form context | Use controlled, non-inferred value such as seller, consultation, or HDFC readiness review only after owner confirms allowed CRM values. | `FIELD_MAPPING_REQUIRES_OWNER_CONFIRMATION` | Required for routing only if confirmed. | No eligibility/qualification claim. |
| `resource_name` | Page/form context | Controlled server value, not arbitrary browser text. | `FIELD_MAPPING_REQUIRES_OWNER_CONFIRMATION` | Recommended. | Enables source context. |
| `page_path` | Browser context | Path only; remove query-string PII. | `FIELD_MAPPING_REQUIRES_OWNER_CONFIRMATION` | Optional. | Retain only under approved policy. |
| `first_touch` | Consent-aware first-party attribution | Preserve first known source/medium/campaign without overwrite. | `FIELD_MAPPING_REQUIRES_OWNER_CONFIRMATION` | Optional. | Non-PII attribution only. |
| `latest_touch` | Consent-aware current attribution | Store separately from first touch. | `FIELD_MAPPING_REQUIRES_OWNER_CONFIRMATION` | Optional. | Non-PII attribution only. |
| `source_system` | Bridge-controlled | Constant controlled value identifying website bridge. | `FIELD_MAPPING_REQUIRES_OWNER_CONFIRMATION` | Recommended. | Must not impersonate a native Lofty source. |
| `event_id` | Browser-generated, bridge-verified | UUID-like idempotency token; retain as opaque string. | `FIELD_MAPPING_REQUIRES_OWNER_CONFIRMATION` | Required by bridge audit. | Not a CRM ID; do not expose it publicly. |
| `bridge_receipt_id` | Bridge-generated | Opaque server receipt. | `FIELD_MAPPING_REQUIRES_OWNER_CONFIRMATION` | Required by bridge audit. | Do not put in analytics with PII. |
| `hdfc_context` | HDFC calculator | Only owner-approved coarse context; do not transfer financial inputs unless documented and necessary. | `FIELD_MAPPING_REQUIRES_OWNER_CONFIRMATION` | HDFC flow only. | Must not state eligibility or approval. |

## Explicit non-mappings

- Do not map calculator income, liquid funds, purchase price, or result tier to Lofty until the owner approves the purpose, field destination, retention, and access controls.
- Do not infer a seller stage, qualification, property value, or lead score from website behavior.
- Do not use email-only matching as an unreviewed overwrite rule. The confirmed Lofty contract must state whether the operation creates, updates, merges, or returns an existing record.

