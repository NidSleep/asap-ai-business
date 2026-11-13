import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
const modulePath = '../server/brands.mjs';
test('copy creates a complete isolated draft and refuses traversal or overwrite', async()=>{
 const {copyBrand}=await import(modulePath); const root=fs.mkdtempSync(path.join(os.tmpdir(),'brand-test-'));
 try {fs.mkdirSync(path.join(root,'source'));fs.writeFileSync(path.join(root,'source','config.json'),JSON.stringify({name:'Client',slug:'source',logo:'/brands/source/assets/mark.svg',colors:{brand:'#222222'},contacts:{email:'client@example.invalid'},contactCTA:{url:'https://client.invalid'},botID:'client',analyticsID:'client',status:'live',domains:['client.invalid'],showEvidence:true}));
 const c=copyBrand('source','new-client','New Client',root);
 assert.equal(c.status,'draft');assert.equal(c.botID,null);assert.equal(c.analyticsID,null);assert.equal(c.logo,null);assert.equal(c.contactCTA.url,null);assert.equal(c.contacts.email,null);assert.deepEqual(c.domains,[]);assert.equal(c.showEvidence,false);
 assert.throws(()=>copyBrand('source','../bad','Bad',root));assert.throws(()=>copyBrand('source','new-client','Again',root));
 assert.equal(JSON.parse(fs.readFileSync(path.join(root,'source','config.json'))).botID,'client');
 }finally{fs.rmSync(root,{recursive:true,force:true});}
});
test('public presentation is allowlisted; private values never serialized', async () => {
  const {publicConfig} = await import(modulePath);
  const result = publicConfig({name:'ASEP',slug:'asep',status:'draft',secret:'private',botID:null,analyticsID:null,contacts:{email:null,secret:'private'},colors:{brand:'#222222',secret:'private'},contactCTA:{url:null,secret:'private'}});
  assert.ok(!JSON.stringify(result).includes('private'));
  assert.ok(!('status' in result));
});
