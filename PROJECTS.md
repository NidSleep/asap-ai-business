# Project launcher catalog and release

This is a functional navigation change to the existing authenticated Directory, not a client redesign. Original draft APIs and forms remain under Brand drafts and existing detail routes.

## Verified metadata (2026-11-17)

Four grouped projects from the current fixed Studio deployment registry plus its two nonarchived saved assistants:

- ASEP demo use: exact current internalName of acp-5e96be, published revision 3, read with a query-only SQLite projection of id/name/status/revision (no knowledge or conversations). Grouped with existing ASEP demo web/Telegram/CRM and public landing, not advertised as revision-connected transports.
- Wave AI: fixed live deployment registry name. Landing https://asep-ai-business.vercel.app identified by repository README and verified public title “Wave AI — AI Chatbot Platform for Businesses”. Telegram https://t.me/presale_copyabc_bot extracted from that public landing. /admin returned the existing /admin/login redirect.
- Furniture store demo: only other active saved Studio assistant; unpublished, so Studio only and no fake chat button.
- Apple stock bot: fixed registry utility. Only its real deployment-registry link is available, clearly labelled; no invented Telegram username.

Directory itself is not a project. Legacy/current Wave transports are grouped, not duplicated. No WhatsApp contact URL verified; no WhatsApp button. Catalog is a curated release snapshot, not a live-sync claim. Future renamed/new projects require updating this allowlist. Ten unique destinations were probed: public pages and Telegram returned 200, protected pages returned their expected 302 sign-in boundary. Neither this nor synthetic UI tests proves real owner Google consent or Telegram message delivery.

## Security and verification

All project hrefs are exact fixed HTTPS allowlisted destinations. No config-derived href, redirect parameter, external asset or script is added. Owner validation, API 401, Origin, CSRF and original draft persistence are unchanged. New /drafts uses the same authenticated handler. Existing backend draft details remain secondary; the Projects homepage contains no JSON.

Run `node --test tests/*.test.mjs` and `CHROMIUM_PATH=/path/to/chrome node scripts/verify-directory-browser.mjs`. Browser fixtures use only an ephemeral local server and temporary synthetic brand storage, never a minted production session. Screenshots are generated outside committed source. Check 320/390/1440 widths, no overflow, four cards, HTTPS buttons at least 44px, create/copy/rename/reload/delete and original bytes preserved.

## Release and rollback

Publish and independently verify remote branch SHA before switching. Build release from committed server files under ~/.local/share/asep-directory/releases/SHA. Add only a later Directory unit WorkingDirectory override, preserving port, BRAND_ROOT, session authority and all security properties. Restart only asep-directory. Remove the new override and daemon-reload/restart Directory to return to 754a0e82d1af39ad689fe5f44f7ec2adc6ebddb6. No storage migration is involved. Preserve protected service PID/start observations and compare afterward.
