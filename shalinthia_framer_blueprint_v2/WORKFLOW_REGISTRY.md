# Workflow Registry

**Status:** READY FOR SHALINTHIA REVIEW  
**Scope:** Website acquisition flows defined for the Conversion Event Contract + HDFC Secure Lead Bridge Micro-Cell.

| Workflow | Trigger | Owner / source of truth | Output | Current status |
|---|---|---|---|---|
| Behavioral acquisition measurement | Named browser interaction from `CONVERSION_EVENT_CONTRACT.md` | Browser/Framer for raw behavior | Raw event with consent-aware first/latest touch | Specification complete; not instrumented. |
| Seller resource / consultation lead | Secure request acknowledged by lead bridge | Lead bridge receipt, then Lofty for contact state | `SELLER_LEAD_CREATED` or `CONSULTATION_REQUESTED` | `MANUAL_SECURE_CONFIGURATION_REQUIRED`. |
| Seller validation and qualification | Authorized CRM/operator action | Lofty | `SELLER_LEAD_VALIDATED`, `SELLER_CONVERSATION_QUALIFIED` | Lofty mapping/criteria not verified. |
| Consultation booking | Scheduling/CRM confirmation | Scheduling system/Lofty | `CONSULTATION_BOOKED` | Provider/Lofty receipt not verified. |
| HDFC calculator behavioral measurement | First meaningful calculator action, valid calculation, result visibility | Browser/Framer | HDFC raw behavioral events | Specification complete; not instrumented. |
| HDFC readiness lead routing | Secure bridge accepts explicit request and receives downstream receipt | Managed bridge and Lofty | `HDFC_READINESS_REVIEW_REQUESTED`, then `HDFC_LEAD_CREATED` | Blocked pending owner/configuration evidence. |
| Lofty P0 acknowledged lead delivery | Managed bridge submits an owner-confirmed lead operation and receives a verified Lofty receipt | Secure bridge, then Lofty | Opaque CRM record ID and trusted lead-created event | `PENDING — APPROVED FOR POST-BUILD EXECUTION`; website build must be completed and reviewed first. See `PENDING_TASKS.md` and the Lofty P0 discovery/specification/checklist. |

## Workflow controls

- Each workflow uses the event envelope and idempotency requirements in `CONVERSION_EVENT_CONTRACT.md`.
- Raw browser behavior never becomes a trusted pipeline event without validation.
- Lofty is the intended real-estate system of record; no alternative CRM is authorized.
- n8n may be used only if it is already approved, owned, and securely configured.
- Daily Approved Work Logs are updated only after explicit Shalinthia approval. The remaining Lofty micro-cell work is approved for post-build execution; the overall project remains open.
