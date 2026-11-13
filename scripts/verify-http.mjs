import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {spawn} from 'node:child_process';
const root=fs.mkdtempSync(path.join(os.tmpdir(),'asep-http-'));
fs.cpSync('brands',path.join(root,'brands'),{recursive:true});
const credentials=JSON.parse(fs.readFileSync(process.env.INTERNAL_CREDENTIAL_FILE,'utf8'));
const auth='Basic '+Buffer.from(`${credentials.username}:${credentials.password}`).toString('base64');
const origin='http://localhost:3418';
const child=spawn(process.execPath,['server/preview.mjs'],{env:{...process.env,NODE_ENV:'production',PORT:'3418',BRAND_ROOT:path.join(root,'brands')},stdio:['ignore','pipe','pipe']});
let logs='';child.stdout.on('data',d=>logs+=d);child.stderr.on('data',d=>logs+=d);
const evidence=[];
async function check(route,status,options={}){const r=await fetch(origin+route,{redirect:'manual',...options});assert.equal(r.status,status,route);evidence.push({route,status:r.status});return r;}
try{
 for(let i=0;i<80;i++){try{if((await fetch(origin+'/health')).ok)break}catch{} if(child.exitCode!==null)throw Error(logs);await new Promise(r=>setTimeout(r,250));}
 for(const route of ['/internal','/internal/brands/asep','/internal/api/brands','/internal/api/brands/asep'])await check(route,401);
 await check('/internal',401,{headers:{authorization:'Basic invalid'}});
 const r=await check('/internal',200,{headers:{authorization:auth}});assert.match(r.headers.get('x-robots-tag'),/noindex/);assert.equal(r.headers.get('cache-control'),'no-store');assert.match(await r.text(),/Brand directory/);
 await check('/internal/api/brands/asep',200,{headers:{authorization:auth}});
 const post={method:'POST',headers:{authorization:auth,'content-type':'application/x-www-form-urlencoded'},body:'source=wave-mind&slug=test-client&name=Test+Client'};
 await check('/internal/api/copy',401,{...post,headers:{'content-type':'application/x-www-form-urlencoded',origin}});
 await check('/internal/api/copy',403,post);
 await check('/internal/api/copy',403,{...post,headers:{...post.headers,origin:'https://evil.invalid'}});
 await check('/internal/api/copy',303,{...post,headers:{...post.headers,origin}});
 const c=JSON.parse(fs.readFileSync(path.join(root,'brands/test-client/config.json')));
 for(const key of ['logo','favicon','botID','analyticsID'])assert.equal(c[key],null);
 assert.equal(c.status,'draft');assert.equal(c.showEvidence,false);assert.equal(c.showPricing,false);assert.deepEqual(c.domains,[]);assert.ok(Object.values(c.contacts).every(x=>x===null));assert.equal(c.contactCTA.url,null);
 assert.deepEqual(fs.readdirSync(path.join(root,'brands/test-client/assets')),[]);
 await check('/internal/api/copy',409,{...post,headers:{...post.headers,origin}});
 await check('/internal/api/copy',400,{...post,headers:{...post.headers,origin},body:'source=asep&slug=..%2Fbad&name=Bad'});
 for(const route of ['/asep','/wave-mind','/test-client'])await check(route,200);
 const config=await (await check('/brands/asep/config.json',200)).json();assert.ok(!('domains' in config));assert.ok(!('status' in config));
 const robots=await (await check('/robots.txt',200)).text();assert.match(robots,/Disallow: \/internal/);
 const http=await import('node:http');
 const denied=await new Promise((resolve,reject)=>{http.get(origin+'/health',{headers:{host:'evil.invalid'}},r=>{r.resume();resolve(r.statusCode)}).on('error',reject)});assert.equal(denied,403);evidence.push({route:'/health (invalid Host)',status:denied});
 fs.mkdirSync('evidence',{recursive:true});fs.writeFileSync('evidence/http.json',JSON.stringify({passed:true,copyStorage:'temporary, removed after test',checks:evidence},null,2));console.log(`HTTP: ${evidence.length} checks passed; copy resets verified`);
}finally{child.kill('SIGTERM');await new Promise(r=>child.once('exit',r));fs.rmSync(root,{recursive:true,force:true});}
