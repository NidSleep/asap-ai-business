import {randomBytes,createHmac,timingSafeEqual} from 'node:crypto';
import {authorized,validOrigin,securityHeaders} from './security.mjs';
import {root,loadBrand,listBrands,internalConfig,copyBrand,updateDraft,deleteDraft} from './brands.mjs';
import {directory} from './directory.mjs';
// Dedicated directory listener: no Next.js, public config, landing, filesystem or asset fallback.
export function directoryHandler({base=root,credentials,origin,mount='/asep-directory'}){
 const external=new URL(origin);
 if(external.origin!==origin||!['https:','http:'].includes(external.protocol)|| (external.protocol==='http:'&&!['localhost','127.0.0.1'].includes(external.hostname)))throw Error('Exact HTTPS origin required');
 if(!/^\/[a-z][a-z0-9-]*$/.test(mount))throw Error('Invalid mount');
 const csrf=createHmac('sha256',randomBytes(32)).update(credentials?.verifier||'unconfigured').digest('hex');
 const failures=new Map();
 return async(req,res)=>{
  const send=(status,body,type='text/plain; charset=utf-8')=>{res.writeHead(status,{'Content-Type':type});res.end(body)};
  for(const [k,v]of Object.entries(securityHeaders))res.setHeader(k,v);
  // no-referrer makes Chromium form POST Origin null. Keep same-origin metadata,
  // while withholding referrers entirely from other origins; never accept null Origin.
  res.setHeader('Referrer-Policy','same-origin');
  if(req.headers.host!==external.host)return send(403,'Host denied');
  const now=Date.now(),key=req.socket.remoteAddress;
  for(const [k,v]of failures)if(v.until<=now)failures.delete(k);
  const fail=failures.get(key);
  if(fail?.count>=20){res.setHeader('Retry-After','60');return send(429,'Too many attempts')}
  if(!authorized(req.headers.authorization,credentials)){
   failures.set(key,{count:(fail?.count||0)+1,until:fail?.until||now+60000});
   res.setHeader('WWW-Authenticate','Basic realm="ASEP directory", charset="UTF-8"');return send(401,'Authentication required');
  }
  failures.delete(key);
  let p=req.url.split('?')[0];
  if(p.includes('%')||p.includes('\\')||p.split('/').some(x=>x==='.'||x==='..')||p.includes('//'))return send(404,'Not found');
  if(p===mount)p='/';else if(p.startsWith(mount+'/'))p=p.slice(mount.length);
  try{
   if(req.method==='GET'&&p==='/')return send(200,directory(null,{base,mount,csrf}),'text/html; charset=utf-8');
   if(req.method==='GET'&&p==='/api/brands')return send(200,JSON.stringify(listBrands(base).map(internalConfig)),'application/json');
   const detail=p.match(/^\/brands\/([a-z0-9-]+)$/),config=p.match(/^\/api\/brands\/([a-z0-9-]+)$/);
   if(req.method==='GET'&&detail){loadBrand(detail[1],base);return send(200,directory(detail[1],{base,mount,csrf}),'text/html; charset=utf-8')}
   if(req.method==='GET'&&config)return send(200,JSON.stringify(internalConfig(loadBrand(config[1],base))),'application/json');
   if(req.method==='POST'&&['/api/copy','/api/update','/api/delete'].includes(p)){
    if(!validOrigin(req.headers.origin,origin))return send(403,'Origin denied');
    if(req.headers['content-type']?.split(';')[0]!=='application/x-www-form-urlencoded')return send(415,'Form encoding required');
    if(Number(req.headers['content-length']||0)>4096)return send(413,'Request too large');
    let length=0;const chunks=[];for await(const part of req){length+=part.length;if(length>4096)return send(413,'Request too large');chunks.push(part)}
    const data=new URLSearchParams(Buffer.concat(chunks).toString('utf8')),given=data.get('csrf')||'';
    if(!/^[a-f0-9]{64}$/.test(given)||!timingSafeEqual(Buffer.from(given),Buffer.from(csrf)))return send(403,'CSRF denied');
    let destination=mount+'/';
    if(p==='/api/copy'){const c=copyBrand(data.get('source'),data.get('slug'),data.get('name'),base);destination=mount+'/brands/'+c.slug}
    if(p==='/api/update'){const c=updateDraft(data.get('slug'),data.get('name'),base);destination=mount+'/brands/'+c.slug}
    if(p==='/api/delete')deleteDraft(data.get('slug'),data.get('confirmation'),base);
    res.writeHead(303,{Location:destination});return res.end();
   }
   return send(404,'Not found');
  }catch(e){return send(e.code==='EEXIST'?409:400,e.code==='EEXIST'?'Brand already exists':'Invalid draft request')}
 };
}
