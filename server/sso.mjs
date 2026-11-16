import http from 'node:http';
// Validate only opaque ASEP sessions against the fixed loopback authority.
export async function validateSession(cookie=''){
 const parts=cookie.split(';').map(x=>x.trim()).filter(x=>x.startsWith('__Host-asep_session='));
 if(parts.length!==1)return null;
 const value=parts[0].slice('__Host-asep_session='.length);
 if(!/^[A-Za-z0-9_-]{40,64}$/.test(value))return null;
 return new Promise((resolve,reject)=>{
  const req=http.get({host:'127.0.0.1',port:8784,path:'/asep-demo-crm/auth/session',headers:{Cookie:'__Host-asep_session='+value},timeout:3000},res=>{
   let body='';res.on('data',b=>{body+=b;if(body.length>4096)req.destroy(Error('Auth unavailable'))});
   res.on('end',()=>{if(res.statusCode===401)return resolve(null);if(res.statusCode===403)return resolve({role:'denied'});
    try{const data=JSON.parse(body);if(res.statusCode!==200||data.role!=='owner'||!/^[A-Za-z0-9_-]{40,64}$/.test(data.csrf))throw Error();resolve(data)}catch{reject(Error('Auth unavailable'))}});
  });req.on('timeout',()=>req.destroy(Error('Auth unavailable')));req.on('error',()=>reject(Error('Auth unavailable')));
 });
}
