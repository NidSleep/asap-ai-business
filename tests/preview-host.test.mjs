import test from 'node:test';
import assert from 'node:assert/strict';
import * as security from '../server/security.mjs';
test('exact configured HTTPS host is allowed alongside loopback only',()=>{
 assert.equal(typeof security.allowedPreviewHost,'function');
 const allowed=h=>security.allowedPreviewHost(h,3417,'https://asep-radxa.tail435239.ts.net:9443');
 for(const h of ['localhost:3417','127.0.0.1:3417','asep-radxa.tail435239.ts.net:9443'])assert.equal(allowed(h),true);
 for(const h of [undefined,'evil.test','asep-radxa.tail435239.ts.net','asep-radxa.tail435239.ts.net:8443','asep-radxa.tail435239.ts.net:9443.evil.test'])assert.equal(allowed(h),false);
 assert.equal(security.validOrigin('https://asep-radxa.tail435239.ts.net:9443','https://asep-radxa.tail435239.ts.net:9443'),true);
 assert.equal(security.validOrigin('https://evil.test','https://asep-radxa.tail435239.ts.net:9443'),false);
});
