# Lofty Secure Configuration Checklist

**Status:** `BLOCKED — OWNER/SECURE CONFIGURATION REQUIRED`  
**Handling rule:** Do not paste credentials, tokens, private endpoint URLs, or secret values into chat, Framer, project files, or source control.

## Owner-controlled prerequisites

- [ ] Confirm the Lofty account/team that owns these website leads and the authorized operator for the integration.
- [ ] Confirm the supported authentication method for this account (registered OAuth application or account-managed API key) and grant only the permissions required for P0 lead delivery.
- [ ] Confirm the exact supported lead create/update/upsert operation, request schema, success condition, record-ID format, duplicate/merge behavior, and rate-limit guidance from the Lofty account/developer documentation.
- [ ] Confirm all standard/custom destination field identifiers and enumerations using `LOFTY_FIELD_MAPPING.md`; explicitly approve the handling or exclusion of HDFC financial data.
- [ ] Select an approved managed bridge under Shalinthia-controlled ownership, with an HTTPS endpoint, origin policy, validation, rate limiting, logging, and retention controls.
- [ ] Store the credential only in the selected bridge's approved server-side secret manager or managed automation credential store. Never expose it in Framer, browser code, repository files, screenshots, or chat.
- [ ] Confirm whether an existing Apps Script path is owned and may be replaced or bypassed. Do not modify it without this confirmation.
- [ ] Provide a permitted test procedure: sandbox/development account or an approved clearly labeled test lead, a responsible reviewer, and a safe cleanup/retention decision.
- [ ] Provide authorized CRM-side access for the reviewer to inspect the controlled test record and confirm its opaque record ID.

## Exact next test after configuration

1. Configure a non-production or explicitly approved test bridge with the selected credential held only in its secret store.
2. Submit one controlled, clearly labeled test lead from the selected Framer draft path using a fixed idempotency key.
3. Capture the bridge receipt, response classification, and opaque CRM record ID without copying secret values.
4. Have the authorized Lofty owner verify the record, source/routing, and duplicate behavior in Lofty.
5. Repeat the identical submission to prove one-record deduplication.
6. Test invalid and transient-failure cases; then update this specification with evidence before any browser instrumentation or production activation.

