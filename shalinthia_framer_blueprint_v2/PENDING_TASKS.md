# Pending Tasks

## Post-build: Lofty P0 acknowledged lead integration

**Status:** `PENDING — APPROVED FOR POST-BUILD EXECUTION; PROJECT REMAINS OPEN`

**Approval record:** Shalinthia approved the remaining work in this integration micro-cell. This approval authorizes post-build execution only; it does not publish Framer, close the overall project, or replace Shalinthia's final review authority.

**Resume only after:** The website build has been completed and reviewed.

**Pickup sequence:**

1. Verify the local n8n runtime starts cleanly.
2. Authenticate through the authorized Lofty Developer Platform.
3. Verify the account-supported authentication, lead-write operation, destination fields, duplicate behavior, rate limits, and positive acknowledgment condition.
4. Store the approved credential only in n8n's managed credential store.
5. Build the minimum acknowledged path and test a controlled lead, duplicate replay, invalid payload, and downstream failure.
6. Emit `SELLER_LEAD_CREATED` or `HDFC_LEAD_CREATED` only after a verified Lofty acknowledgment.

**Guardrails:** No browser-to-Lofty calls, no secrets in Framer or source control, no Framer publication, and no project-close status as part of this work item.
