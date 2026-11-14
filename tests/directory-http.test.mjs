import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import os from 'node:os';import path from 'node:path';import http from 'node:http';import {scryptSync} from 'node:crypto';
test('mounted directory is fail-closed and supports only isolated CSRF-protected draft CRUD',async()=>{
 assert.ok(fs.existsSync(new URL('../server/directory-handler.mjs',import.meta.url)),'dedicated directory handler required');
 const {directoryHandler}=await import('../server/directory-handler.mjs');
 const base=fs.mkdtempSync(path.join(os.tmpdir(),'asep-http-'));fs.mkdirSync(path.join(base,'source'));fs.writeFileSync(path.join(base,'source/config.json'),JSON.stringify({slug:'source',name:'DEMO source',status:'live',secret:'never-expose',botID:'synthetic',contacts:{email:'synthetic@example.invalid'}}));
 const salt='1234567890abcdef1234567890abcdef',password='synthetic-test-only';const credentials={username:'tester',salt,verifier:scryptSync(password,Buffer.from(salt,'hex'),32).toString('hex')};
 const origin='https://directory.example.invalid',mount='/asep-directory';
 const server=http.createServer(directoryHandler({base,credentials,origin,mount}));await new Promise(r=>server.listen(0,'127.0.0.1',r));
 const request=(route,options={})=>new Promise((resolve,reject)=>{const req=http.request({host:'127.0.0.1',port:server.address().port,path:route,method:options.body?'POST':'GET',headers:{Host:'directory.example.invalid',...(options.auth?{Authorization:'Basic '+Buffer.from('tester:'+password).toString('base64')} : {}),...options.headers}},res=>{let body='';res.on('data',b=>body+=b);res.on('end',()=>resolve({status:res.statusCode,headers:res.headers,body}))});req.on('error',reject);req.end(options.body)});
 try{
 for(const route of ['/',mount+'/',mount+'/api/brands',mount+'/api/brands/source','/api/brands','/assets/nope','/internal'])assert.equal((await request(route)).status,401);
 assert.equal((await request('/',{auth:true,headers:{Host:'evil.invalid'}})).status,403);
 const page=await request(mount+'/',{auth:true});assert.equal(page.status,200);assert.match(page.headers['content-security-policy'],/script-src 'none'/);assert.ok(!page.body.includes('never-expose'));
 assert.ok(!/href="\/(?!asep-directory\/)/.test(page.body));assert.match(page.body,/name="csrf"/);
 const csrf=page.body.match(/name="csrf" value="([a-f0-9]+)"/)[1];
 const post=(route,body,extra={})=>request(mount+route,{auth:true,body:new URLSearchParams(body).toString(),headers:{Origin:origin,'Content-Type':'application/x-www-form-urlencoded',...extra}});
 assert.equal((await post('/api/copy',{source:'source',slug:'demo',name:'DEMO'})).status,403);
 assert.equal((await post('/api/copy',{csrf,source:'source',slug:'demo',name:'DEMO'},{Origin:'https://evil.invalid'})).status,403);
 const created=await post('/api/copy',{csrf,source:'source',slug:'demo',name:'DEMO'});assert.equal(created.status,303);assert.equal(created.headers.location,mount+'/brands/demo');
 assert.equal((await post('/api/copy',{csrf,source:'source',slug:'demo',name:'Again'})).status,409);
 const config=JSON.parse((await request('/api/brands/demo',{auth:true})).body);assert.equal(config.botID,null);assert.equal(config.contacts.email,null);
 assert.equal((await post('/api/update',{csrf,slug:'demo',name:'Edited'})).status,303);
 assert.equal(JSON.parse(fs.readFileSync(path.join(base,'demo/config.json'))).name,'Edited');
 assert.equal((await post('/api/delete',{csrf,slug:'source',confirmation:'source'})).status,400);
 assert.equal((await post('/api/delete',{csrf,slug:'demo',confirmation:'demo'})).status,303);assert.ok(!fs.existsSync(path.join(base,'demo')));
 for(const route of ['/brands/source/config.json','/asep-directory/../internal','/%2e%2e/internal','/asep-directoryevil/'])assert.equal((await request(route,{auth:true})).status,404);
 assert.equal((await post('/api/copy',{csrf,source:'source',slug:'bad',name:'x'.repeat(5000)})).status,413);
 }finally{await new Promise(r=>server.close(r));fs.rmSync(base,{recursive:true,force:true})}
});
