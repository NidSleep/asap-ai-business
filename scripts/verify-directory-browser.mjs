// Ephemeral synthetic test server only. Never connects to or replaces port 3417.
import {chromium} from 'playwright';import http from 'node:http';import fs from 'node:fs';import os from 'node:os';import path from 'node:path';import {scryptSync} from 'node:crypto';import assert from 'node:assert/strict';
import {directoryHandler} from '../server/directory-handler.mjs';
const base=fs.mkdtempSync(path.join(os.tmpdir(),'asep-browser-fixture-'));
fs.mkdirSync(path.join(base,'source'));const original=JSON.stringify({slug:'source',name:'DEMO Source',status:'live',botID:'synthetic-client',contacts:{email:'source@example.invalid'},domains:['source.invalid']});fs.writeFileSync(path.join(base,'source/config.json'),original);
const username='synthetic-test',password='not-a-real-password-fixture',salt='1234567890abcdef1234567890abcdef';
const credentials={username,salt,verifier:scryptSync(password,Buffer.from(salt,'hex'),32).toString('hex')};
let handler;const server=http.createServer((req,res)=>handler(req,res));await new Promise(r=>server.listen(0,'127.0.0.1',r));const origin='http://127.0.0.1:'+server.address().port;handler=directoryHandler({base,origin,sso:async cookie=>cookie==='fixture=synthetic-owner'?{role:'owner',csrf:'c'.repeat(43)}:null});
const browser=await chromium.launch({headless:true,executablePath:process.env.CHROMIUM_PATH,args:['--no-sandbox']});fs.mkdirSync('evidence/directory-final',{recursive:true});
try{for(const width of [320,390,1440]){
 const context=await browser.newContext({viewport:{width,height:900},isMobile:width<500,hasTouch:width<500});
 await context.addCookies([{name:'fixture',value:'synthetic-owner',url:origin}]);
 const page=await context.newPage();page.on('response',async r=>{if(r.status()>=400)console.log('HTTP test response',r.status(),new URL(r.url()).pathname,await r.text(),'origin',r.request().headers().origin)});const errors=[];page.on('pageerror',e=>errors.push(e.message));
 assert.equal((await page.goto(origin+'/asep-directory/')).status(),200);
 assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
 assert.equal(await page.locator('.grid article').count(),2);
 assert.deepEqual(await page.locator('.grid article h2').allTextContents(),['ASEP demo use','Wave AI']);
 assert.equal(await page.locator('pre').count(),0);
 for(const link of await page.locator('.launch').all()){assert.ok((await link.getAttribute('href')).startsWith('https://'));assert.ok((await link.boundingBox()).height>=44);}
 await page.screenshot({path:`evidence/directory-final/projects-${width}.png`,fullPage:true});
 await page.getByRole('link',{name:'Brand drafts',exact:true}).click();
 await page.getByText('Copy a brand',{exact:true}).click();await page.getByLabel('New brand name').fill('DEMO Copy');await page.getByLabel('New URL slug').fill('demo-copy');await page.getByRole('button',{name:'Create draft',exact:true}).click();
 await page.waitForURL('**/brands/demo-copy');assert.equal(await page.locator('h1').innerText(),'DEMO Copy');
 let data=JSON.parse(fs.readFileSync(path.join(base,'demo-copy/config.json')));assert.equal(data.botID,null);assert.equal(data.contacts.email,null);assert.deepEqual(data.domains,[]);assert.equal(data.webCTA.url,null);
 await page.getByLabel('Brand name',{exact:true}).fill('DEMO Renamed');await page.getByRole('button',{name:'Save draft',exact:true}).click();await page.waitForLoadState('networkidle');assert.equal(await page.locator('h1').innerText(),'DEMO Renamed');
 await page.reload();assert.equal(await page.getByLabel('Brand name',{exact:true}).inputValue(),'DEMO Renamed');
 await page.screenshot({path:`evidence/directory-final/draft-${width}.png`,fullPage:true});
 await page.locator('summary').filter({hasText:'Delete draft'}).click();await page.getByLabel('Type demo-copy to confirm').fill('demo-copy');await page.getByRole('button',{name:'Delete draft',exact:true}).click();await page.waitForURL('**/asep-directory/');assert.equal(fs.existsSync(path.join(base,'demo-copy')),false);
 assert.equal(fs.readFileSync(path.join(base,'source/config.json'),'utf8'),original);assert.deepEqual(errors,[]);
 await page.screenshot({path:`evidence/directory-final/list-${width}.png`,fullPage:true});await context.close();
 console.log(JSON.stringify({width,create:true,read:true,rename:true,reload:true,delete:true,sourceUnchanged:true,overflow:false}));
}}finally{await browser.close();await new Promise(r=>server.close(r));fs.rmSync(base,{recursive:true,force:true})}
