import {timingSafeEqual,scryptSync,createHash} from 'node:crypto';
export function authorized(header,config){
 if(!config?.username || config.password || !/^[a-f0-9]{32}$/.test(config.salt||'') || !/^[a-f0-9]{64}$/.test(config.verifier||'') || !header?.startsWith('Basic ') || header.length>2048) return false;
 const raw=Buffer.from(header.slice(6),'base64').toString('utf8');const split=raw.indexOf(':');
 if(split<1)return false;
 const hash=x=>createHash('sha256').update(x).digest();
 const usernameOK=timingSafeEqual(hash(raw.slice(0,split)),hash(config.username));
 const passwordOK=timingSafeEqual(scryptSync(raw.slice(split+1),Buffer.from(config.salt,'hex'),32),Buffer.from(config.verifier,'hex'));
 return usernameOK && passwordOK;
}
export function validOrigin(origin,expected){return typeof origin==='string' && origin===expected;}
export function allowedPreviewHost(host,port,origin){
 const allowed=[`localhost:${port}`,`127.0.0.1:${port}`];
 const external=new URL(origin);
 if(external.protocol==='https:' && external.origin===origin)allowed.push(external.host);
 return allowed.includes(host);
}
export const securityHeaders={
 'Cache-Control':'no-store','X-Robots-Tag':'noindex, nofollow','X-Content-Type-Options':'nosniff','Referrer-Policy':'no-referrer','X-Frame-Options':'DENY',
 'Content-Security-Policy':"default-src 'none'; style-src 'unsafe-inline'; img-src 'self'; script-src 'none'; form-action 'self'; base-uri 'none'; frame-ancestors 'none'"
};
