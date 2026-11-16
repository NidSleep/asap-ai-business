# ASEP Google session boundary

Directory accepts only an opaque `__Host-asep_session` cookie validated on every request by the fixed loopback CRM authority at port 8784. Basic credentials and identity headers do not authenticate. Owner membership comes exclusively from the isolated ASEP authority; no Wave membership or database is used. Failure of authority returns 503, missing session returns 401 on APIs or redirects HTML to `/asep-demo-crm/login?next=/asep-directory/`.

The existing callback remains `https://asep-radxa.tail435239.ts.net/asep-demo-crm/auth/callback`. No additional callback is introduced. CRM owns state/nonce/PKCE, signature verification, allowlist, 12-hour sessions and POST/CSRF logout. Directory mutations retain exact Origin and session-bound CSRF checks. Public landing and bots are unchanged.

Deploy only after remote SHA verification. Preserve existing service environment, brand root and loopback listener. Use an additive working-directory override pointing to this committed release, retaining old release and unit for rollback. Restart only asep-directory. Verify public HTML redirects, APIs reject missing/forged sessions, old Basic no longer authenticates, and the configured host is enforced. Real Google consent/login requires owner browser verification; synthetic session tests are not evidence of real Google completion.
