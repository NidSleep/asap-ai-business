import test from 'node:test';
import assert from 'node:assert/strict';
import {publicConfig} from '../server/brands.mjs';
test('identity assets stay inside own brand; favicon is independent',()=>{
 const base={slug:'asep',name:'ASEP'};
 assert.equal(publicConfig({...base,logo:'/brands/wave-mind/assets/logo.svg'}).logo,null);
 assert.equal(publicConfig({...base,logo:'/brands/asep/assets/../logo.svg'}).logo,null);
 assert.equal(publicConfig({...base,logo:'/brands/asep/assets/logo.svg'}).logo,'/brands/asep/assets/logo.svg');
 assert.equal(publicConfig({...base,logo:'/brands/asep/assets/logo.svg'}).favicon,null);
 assert.equal(publicConfig({...base,favicon:'/brands/asep/assets/icon.ico'}).favicon,'/brands/asep/assets/icon.ico');
});
