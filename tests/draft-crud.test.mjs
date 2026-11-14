import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import os from 'node:os';import path from 'node:path';
import * as brands from '../server/brands.mjs';
test('draft edits and deletion cannot change existing client or connect a copied brand',()=>{
 assert.equal(typeof brands.updateDraft,'function');
 const base=fs.mkdtempSync(path.join(os.tmpdir(),'asep-crud-'));
 try{
 fs.mkdirSync(path.join(base,'source'));const original=JSON.stringify({slug:'source',name:'Synthetic client',status:'live',contacts:{email:'client@example.invalid'},contactCTA:{url:'https://client.invalid'},webCTA:{url:'https://client.invalid'},botID:'synthetic-client',domains:['client.invalid']});fs.writeFileSync(path.join(base,'source/config.json'),original);
 const draft=brands.copyBrand('source','demo-copy','Copy',base);assert.equal(draft.webCTA?.url??null,null);
 assert.throws(()=>brands.updateDraft('source','Changed',base));assert.throws(()=>brands.deleteDraft('source','source',base));
 const edited=brands.updateDraft('demo-copy','Renamed',base);assert.equal(edited.name,'Renamed');assert.equal(edited.status,'draft');assert.equal(edited.botID,null);
 assert.throws(()=>brands.updateDraft('../source','Bad',base));assert.throws(()=>brands.updateDraft('demo-copy','',base));
 assert.throws(()=>brands.deleteDraft('demo-copy','wrong',base));brands.deleteDraft('demo-copy','demo-copy',base);assert.equal(fs.existsSync(path.join(base,'demo-copy')),false);
 assert.equal(fs.readFileSync(path.join(base,'source/config.json'),'utf8'),original);
 }finally{fs.rmSync(base,{recursive:true,force:true})}
});
