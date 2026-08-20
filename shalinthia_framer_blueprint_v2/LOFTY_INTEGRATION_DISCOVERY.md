# Lofty P0 Integration Discovery

**Status:** `BLOCKED — OWNER/SECURE CONFIGURATION REQUIRED`  
**Scope:** Proof of one acknowledged website-to-Lofty lead path. This discovery does not authorize credentials, endpoint changes, browser-side CRM calls, or publication.

## Decision

No account-compatible Lofty write contract is available in this workspace. Do not implement a bridge request, Lofty API call, or trusted lead-created event until the owner provides the controlled configuration and the exact supported account contract is verified in an authorized test.

## Evidence reviewed

| Evidence source | Result | Integration consequence |
|---|---|---|
| Workspace files, including hidden files | No Lofty, n8n, HubSpot, webhook, environment, credential, or bridge configuration was found. | No current delivery path can be verified or reused. |
| Current Framer source review | No Lofty API, webhook, CRM acknowledgement, n8n workflow, or trusted lead event instrumentation was found. The HDFC calculator uses an opaque browser `no-cors` Apps Script attempt. | The existing request cannot prove downstream receipt and must not produce `HDFC_LEAD_CREATED`. |
| Lofty Developer API documentation | Lofty documents lead-management capabilities and authenticated API access through OAuth 2.0 or an API key. | A server-side bridge is technically possible, but the account's permitted authentication mode, scopes, and lead-write operation remain unverified. |
| Lofty account / Developer Portal access | Not supplied or available in the project. | No application, API key, authorization, account permission, field ID, rate limit, or test record can be verified. |

## Official-platform findings

- Lofty documents OAuth 2.0 for third-party integrations and API keys for personal automation. OAuth access depends on a registered application and granted scopes; API keys are user-scoped.
- Lofty documents lead management, but this project has not verified the account-specific create/update/upsert operation, payload shape, duplicate rules, custom-field identifiers, routing behavior, or receipt fields.
- Lofty identifiers can be 64-bit integers. A bridge must preserve any returned CRM record ID as an opaque string rather than a JavaScript number.

## Unknowns that block implementation

| Required fact | Current status |
|---|---|
| Approved Lofty authentication method for this account | `UNKNOWN — OWNER CONFIRMATION REQUIRED` |
| API application approval, scopes, and team permissions | `UNKNOWN — OWNER CONFIRMATION REQUIRED` |
| Exact supported lead create/update/upsert operation and positive receipt | `UNKNOWN — PROVIDER/OWNER CONFIRMATION REQUIRED` |
| Lofty standard/custom field identifiers and allowed values | `FIELD_MAPPING_REQUIRES_OWNER_CONFIRMATION` |
| Duplicate/merge behavior and routing owner | `UNKNOWN — OWNER CONFIRMATION REQUIRED` |
| Approved server-side bridge and secret manager | `UNKNOWN — OWNER/SECURE CONFIGURATION REQUIRED` |
| Test environment or permitted, clearly labeled test-lead procedure | `UNKNOWN — OWNER CONFIRMATION REQUIRED` |
| Existing Apps Script replacement/bypass authority | `OWNER_VERIFICATION_REQUIRED` |

## Permitted next step

Use the owner-controlled checklist in `LOFTY_SECURE_CONFIGURATION_CHECKLIST.md`. After its requirements are supplied through approved secure configuration, run one controlled test lead through the bridge, record the positive receipt and opaque CRM ID, and only then implement the corresponding trusted event transition.

