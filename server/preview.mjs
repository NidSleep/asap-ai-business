import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import next from 'next';
import {authorized,validOrigin,allowedPreviewHost,securityHeaders} from './security.mjs';
import {root,loadBrand,listBrands,publicConfig,internalConfig,copyBrand} from './brands.mjs';
import {directory} from './directory.mjs';
const port=Number(process.env.PORT||3417);
const origin=process.env.PREVIEW_ORIGIN||`http://localhost:${port}`;
const credentialPath=process.env.INTERNAL_CREDENTIAL_FILE;
let credentials=null;
if(credentialPath){const stat=fs.statSync(credentialPath);if(stat.mode&0o077)throw new Error('Credential file must be private (0600)');credentials=JSON.parse(fs.readFileSync(credentialPath,'utf8'));}
const app=next({dev:process.env.NODE_ENV!=='production',hostname:'127.0.0.1',port});await app.prepare();const handle=app.getRequestHandler();
const failures=new Map();
const server=http.createServer(async(req,res)=>{
 const send=(status,body,type='text/plain; charset=utf-8')=>{res.writeHead(status,{'Content-Type':type});res.end(body)};
 let url;try{url=new URL(req.url,'http://localhost')}catch{return send(400,'Invalid URL')}
 const p=url.pathname;
 res.setHeader('X-Content-Type-Options','nosniff');res.setHeader('Referrer-Policy','no-referrer');res.setHeader('X-Robots-Tag','noindex, nofollow');
 // Exact host validation prevents DNS-rebinding against a loopback preview.
 if(!allowedPreviewHost(req.headers.host,port,origin))return send(403,'Host denied');
 if(p==='/internal'||p.startsWith('/internal/')){
  for(const [k,v] of Object.entries(securityHeaders))res.setHeader(k,v);
  const key=req.socket.remoteAddress;const now=Date.now();const fail=failures.get(key);
  if(fail&&fail.until>now&&fail.count>=20){res.setHeader('Retry-After','60');return send(429,'Too many attempts')}
  if(!authorized(req.headers.authorization,credentials)){
   failures.set(key,{count:fail&&fail.until>now?fail.count+1:1,until:now+60000});
   res.setHeader('WWW-Authenticate','Basic realm="Brand directory", charset="UTF-8"');return send(401,credentials?'Authentication required':'Authentication required. Owner credential setup is pending.');
  }
  failures.delete(key);
  try{
   if(req.method==='GET'&&p==='/internal')return send(200,directory(),'text/html; charset=utf-8');
   if(req.method==='GET'&&p==='/internal/api/brands')return send(200,JSON.stringify(listBrands().map(internalConfig)),'application/json');
   const detail=p.match(/^\/internal\/brands\/([a-z0-9-]+)$/);
   if(req.method==='GET'&&detail){loadBrand(detail[1]);return send(200,directory(detail[1]),'text/html; charset=utf-8')}
   const config=p.match(/^\/internal\/api\/brands\/([a-z0-9-]+)$/);
   if(req.method==='GET'&&config)return send(200,JSON.stringify(internalConfig(loadBrand(config[1]))),'application/json');
   if(req.method==='POST'&&p==='/internal/api/copy'){
    if(!validOrigin(req.headers.origin,origin))return send(403,'Origin denied');
    if(!req.headers['content-type']?.startsWith('application/x-www-form-urlencoded'))return send(415,'Form encoding required');
    if(Number(req.headers['content-length']||0)>4096)return send(413,'Request too large');
    let body='';for await(const part of req){body+=part.toString();if(Buffer.byteLength(body)>4096)return send(413,'Request too large')}
    const data=new URLSearchParams(body);const c=copyBrand(data.get('source'),data.get('slug'),data.get('name'));
    res.writeHead(303,{Location:`/internal/brands/${c.slug}`});return res.end();
   }
   return send(404,'Not found');
  }catch(e){return send(e.code==='EEXIST'?409:400,e.code==='EEXIST'?'Brand already exists':'Invalid brand request')}
 }
 if(!['GET','HEAD'].includes(req.method))return send(405,'Method not allowed');
 if(p==='/robots.txt')return send(200,'User-agent: *\nDisallow: /internal\nDisallow: /\n');
 if(p==='/health')return send(200,'ok');
 if(p==='/favicon.ico')return send(204,'');
 const config=p.match(/^\/brands\/([a-z0-9-]+)\/config.json$/);
 if(config){try{return send(200,JSON.stringify(publicConfig(loadBrand(config[1]))),'application/json')}catch{return send(404,'Not found')}}
 const asset=p.match(/^\/brands\/([a-z0-9-]+)\/assets\/([a-zA-Z0-9_.-]+)$/);
 if(asset){try{
  loadBrand(asset[1]);const file=path.join(root,asset[1],'assets',asset[2]);const ext=path.extname(file);const types={'.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.webp':'image/webp','.ico':'image/x-icon'};
  if(!types[ext]||fs.lstatSync(path.join(root,asset[1],'assets')).isSymbolicLink()||fs.lstatSync(file).isSymbolicLink())return send(404,'Not found');
  res.setHeader('Content-Security-Policy',"default-src 'none'; sandbox");return send(200,fs.readFileSync(file),types[ext]);
 }catch{return send(404,'Not found')}}
 if(p.startsWith('/brands/'))return send(404,'Not found');
 return handle(req,res);
});
server.listen(port,'127.0.0.1',()=>console.log(`Preview ready: http://localhost:${port}; internal auth ${credentials?'configured':'fail-closed (setup pending)'}`));
