import {chromium} from 'playwright';import http from 'node:http';import fs from 'node:fs';import path from 'node:path';import assert from 'node:assert/strict';
const dir=path.resolve(process.env.LANDING_DIR||'.tmp/landing-export/out');let server;
let origin=process.env.LANDING_URL;
if(!origin){server=http.createServer((req,res)=>{let p=decodeURIComponent(req.url.split('?')[0]);if(p==='/')p='/index.html';const file=path.resolve(dir,'.'+p);if(!file.startsWith(dir+'/')||!fs.existsSync(file)||!fs.statSync(file).isFile()){res.writeHead(404);return res.end('Not found')}const types={'.html':'text/html','.js':'text/javascript','.css':'text/css','.svg':'image/svg+xml','.woff2':'font/woff2','.png':'image/png','.txt':'text/plain','.json':'application/json'};res.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream'});res.end(fs.readFileSync(file))});await new Promise(r=>server.listen(0,'127.0.0.1',r));origin='http://127.0.0.1:'+server.address().port;}
const browser=await chromium.launch({headless:true,executablePath:process.env.CHROMIUM_PATH,args:['--no-sandbox']});const report=[];const evidence=process.env.LANDING_URL?'evidence/landing-public':'evidence/landing-local';fs.mkdirSync(evidence,{recursive:true});
try{for(const width of [320,390,1440]){
 const context=await browser.newContext({viewport:{width,height:900},reducedMotion:'reduce',isMobile:width<500,hasTouch:width<500});const page=await context.newPage();const errors=[],failed=[],external=[];
 page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text())});page.on('response',r=>{if(r.status()>=400)failed.push({url:r.url(),status:r.status()})});page.on('request',r=>{if(new URL(r.url()).origin!==origin)external.push(r.url())});
 assert.equal((await page.goto(origin+'/',{waitUntil:'networkidle'})).status(),200);
 await page.evaluate(async()=>Promise.all([...document.images].map(i=>i.decode())));
 assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
 const links=await page.locator('a[href^="https:"]').evaluateAll(es=>es.map(e=>({text:e.textContent,href:e.href,rel:e.rel})));
 assert.ok(links.some(l=>l.href==='https://t.me/ASEP_Demobot'));assert.ok(links.some(l=>l.href==='https://asep-radxa.tail435239.ts.net/asep-demo/'));
 assert.ok(links.every(l=>['https://t.me/ASEP_Demobot','https://asep-radxa.tail435239.ts.net/asep-demo/'].includes(l.href)),JSON.stringify(links));
 const text=await page.locator('body').innerText();assert.ok(!/wave mind|wave ai|contact pending|wa\.me/i.test(text));assert.equal(await page.locator('#pricing').count(),0);
 assert.equal(await page.locator('img[src="/brands/asep/assets/asep-wordmark.svg"]').count()>0,true);
 await page.screenshot({path:`${evidence}/top-${width}.png`});
 if(width<768){await page.getByRole('button',{name:'Open menu',exact:true}).click();await page.getByRole('button',{name:'Close menu',exact:true}).waitFor();await page.keyboard.press('Escape');}
 for(const href of await page.locator('a[href^="#"]').evaluateAll(es=>es.map(e=>e.getAttribute('href')))){assert.ok(await page.locator('[id="'+href.slice(1)+'"]').count(),href)}
 await page.locator('footer').scrollIntoViewIfNeeded();await page.screenshot({path:`${evidence}/footer-${width}.png`});
 assert.deepEqual(errors,[]);assert.deepEqual(failed,[]);assert.deepEqual(external,[]);
 report.push({width,status:200,links,imagesDecoded:true,overflow:false,errors,failed,external});await context.close();
}
fs.writeFileSync(evidence+'/result.json',JSON.stringify({origin,passed:true,report},null,2));console.log(JSON.stringify({origin,passed:true,widths:report.map(r=>r.width)}));
}finally{await browser.close();if(server)await new Promise(r=>server.close(r))}
