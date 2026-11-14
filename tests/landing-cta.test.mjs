import test from 'node:test';import assert from 'node:assert/strict';import {loadBrand,publicConfig,copyBrand} from '../server/brands.mjs';
test('ASEP public CTA destinations are exactly its Telegram and web demo',()=>{
 const c=publicConfig(loadBrand('asep'));
 assert.equal(c.contactCTA.url,'https://t.me/ASEP_Demobot');
 assert.equal(c.webCTA.url,'https://asep-radxa.tail435239.ts.net/asep-demo/');
 assert.equal(c.contacts.whatsapp,null);assert.equal(c.contacts.phone,null);
});
