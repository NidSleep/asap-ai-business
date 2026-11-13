import {timingSafeEqual,createHash} from 'node:crypto';
export function authorized(header,config){
 if(!config?.username || !config?.password || !header?.startsWith('Basic ') || header.length>2048) return false;
 const hash=x=>createHash('sha256').update(x).digest();
 return timingSafeEqual(hash(Buffer.from(header.slice(6),'base64')),hash(Buffer.from(`${config.username}:${config.password}`)));
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
