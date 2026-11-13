import {chromium} from 'playwright';
import fs from 'node:fs';
import assert from 'node:assert/strict';
const credentials=JSON.parse(fs.readFileSync(process.env.INTERNAL_CREDENTIAL_FILE,'utf8'));
const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||undefined,headless:true,args:['--no-sandbox']});
const evidence=[];fs.mkdirSync('evidence/screenshots',{recursive:true});
try{for(const width of [320,390,1440]){
 const context=await browser.newContext({viewport:{width,height:900},httpCredentials:credentials,reducedMotion:'reduce'});
 const page=await context.newPage();const errors=[],requests=[],failed=[];
 page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text())});page.on('request',r=>requests.push(r.url()));page.on('requestfailed',r=>failed.push(r.url()));
 for(const route of ['/asep','/wave-mind','/internal','/internal/brands/asep']){
  const start=requests.length;const response=await page.goto('http://localhost:3417'+route,{waitUntil:'networkidle'});assert.equal(response.status(),200);
  await page.evaluate(async()=>{await Promise.all([...document.images].map(im=>im.decode()))});
  const metrics=await page.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth,images:[...document.images].map(i=>({src:i.getAttribute('src'),ok:i.complete&&i.naturalWidth>0})),text:document.body.innerText,title:document.title,meta:[...document.querySelectorAll('meta')].map(e=>e.outerHTML).join(''),links:[...document.querySelectorAll('[href],[src],[alt]')].map(e=>[e.getAttribute('href'),e.getAttribute('src'),e.getAttribute('alt')]).flat().filter(Boolean)}));
  assert.ok(metrics.scroll<=width,route+' overflow '+metrics.scroll);assert.ok(metrics.images.every(i=>i.ok));
  if(route==='/asep'){
   assert.ok(!/wave/i.test(metrics.text+metrics.title+metrics.meta+JSON.stringify(metrics.links)),'ASEP branding leakage');
   assert.ok(!requests.slice(start).some(u=>/wave/i.test(u)),'ASEP URL leakage');
   assert.equal(await page.locator('#pricing').count(),0);
   for(const href of await page.locator('a[href^="#"]').evaluateAll(es=>es.map(e=>e.getAttribute('href')))){assert.ok(await page.locator('[id="'+href.slice(1)+'"]').count(),`missing anchor ${href}`)}
   if(width<768){await page.getByRole('button',{name:'Open menu',exact:true}).click();assert.equal(await page.getByRole('button',{name:'Close menu',exact:true}).getAttribute('aria-expanded'),'true');await page.keyboard.press('Escape');}
  }
  await page.screenshot({path:`evidence/screenshots/${route.replaceAll('/','_')}-${width}.png`,fullPage:true});
  evidence.push({route,width,status:response.status(),overflow:false,images:metrics.images,title:metrics.title});
 }
 assert.deepEqual(errors,[]);assert.deepEqual(failed,[]);assert.ok(requests.every(u=>new URL(u).hostname==='localhost'),'external requests');
 evidence.push({width,consoleErrors:errors,failedRequests:failed,outboundRequests:[],requests:[...new Set(requests)]});await context.close();
}
fs.writeFileSync('evidence/browser.json',JSON.stringify({passed:true,checks:evidence},null,2));console.log('Browser: 12 route/viewport screenshots; image decode, overflow, metadata, anchors, menu, console and network passed');
}finally{await browser.close()}
