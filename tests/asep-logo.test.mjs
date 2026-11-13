import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {loadBrand,publicConfig} from '../server/brands.mjs';
test('provisional ASEP assets are allowlisted, exist, and integrations stay off',()=>{const b=publicConfig(loadBrand('asep'));for(const key of ['logo','favicon']){assert.match(b[key],/^\/brands\/asep\/assets\/asep-.*\.svg$/);assert.match(fs.readFileSync('.'+b[key],'utf8'),/<svg/)}assert.equal(b.botID,null);assert.equal(b.analyticsID,null);assert.equal(b.contactCTA.url,null);assert.equal(b.identityPending,true)});
