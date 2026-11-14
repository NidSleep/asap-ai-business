import fs from 'node:fs';
import path from 'node:path';
export const root = path.resolve(process.env.BRAND_ROOT || 'brands');
export function validSlug(slug) { return typeof slug === 'string' && /^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/.test(slug) && slug.length <= 48 && !['internal','api','assets','brands','server'].includes(slug); }
const string = (x) => typeof x === 'string' ? x : null;
export function publicConfig(c) {
 const colors={};
 for(const key of ['brand','brandStrong','brandLight','ink','inkSoft','background','muted','border']) colors[key]=/^#[\da-f]{6}$/i.test(c.colors?.[key]||'') ? c.colors[key] : '#333333';
 const contacts={};
 for(const key of ['email','phone','whatsapp','socials','address']) contacts[key]=string(c.contacts?.[key]);
 const localAsset = value => typeof value === 'string' && new RegExp(`^/brands/${c.slug}/assets/[a-zA-Z0-9_-][a-zA-Z0-9_.-]*\\.(svg|png|jpg|webp|ico)$`).test(value) && !value.includes('..') ? value : null;
 const logo = localAsset(c.logo);
 return {slug:c.slug,name:string(c.name)||'Untitled',logo, favicon:localAsset(c.favicon),colors,contacts,
 contactCTA:{label:string(c.contactCTA?.label)||'Contact pending',url: typeof c.contactCTA?.url==='string' && /^https:\/\//.test(c.contactCTA.url) ? c.contactCTA.url:null},
 webCTA:{label:string(c.webCTA?.label)||'Web chat pending',url: typeof c.webCTA?.url==='string' && /^https:\/\//.test(c.webCTA.url) ? c.webCTA.url:null},
 botID:string(c.botID),analyticsID:string(c.analyticsID),showEvidence:c.showEvidence===true,showPricing:c.showPricing===true,identityPending:c.identityPending===true};
}
export function loadBrand(slug,base=root) {
 if(!validSlug(slug)) throw new Error('Invalid brand');
 const dir=path.join(base,slug);
 if(fs.lstatSync(dir).isSymbolicLink()) throw new Error('Invalid brand');
 const file=path.join(dir,'config.json');
 if(fs.lstatSync(file).isSymbolicLink()) throw new Error('Invalid config');
 return {...JSON.parse(fs.readFileSync(file,'utf8')),slug};
}
export function listBrands(base=root) {return fs.readdirSync(base).filter(validSlug).filter(s=>fs.statSync(path.join(base,s)).isDirectory()).map(s=>loadBrand(s,base));}
export function copyBrand(source,slug,name,base=root) {
 if(!validSlug(slug) || typeof name !== 'string' || !name.trim() || name.length>80) throw new Error('Invalid name or slug');
 const original=publicConfig(loadBrand(source,base));
 const config={...original,slug,name:name.trim(),logo:null,favicon:null,contacts:{email:null,phone:null,whatsapp:null,socials:null,address:null},contactCTA:{label:'Contact pending',url:null},botID:null,analyticsID:null,status:'draft',directoryDraft:true,webCTA:{label:'Web chat pending',url:null},domains:[],updatedAt:new Date().toISOString(),showEvidence:false,showPricing:false,identityPending:true};
 const destination=path.join(base,slug);
 // Exclusive directory reservation prevents both overwrite and races. Publish config last, by atomic rename.
 fs.mkdirSync(destination,{mode:0o700});
 try {fs.mkdirSync(path.join(destination,'assets'),{mode:0o700});const temp=path.join(destination,'.config.tmp');fs.writeFileSync(temp,JSON.stringify(config,null,2)+'\n',{flag:'wx',mode:0o600});fs.renameSync(temp,path.join(destination,'config.json'));}
 catch(e){fs.rmSync(destination,{recursive:true,force:true});throw e;}
 return config;
}
function editableDraft(slug,base){
 const c=loadBrand(slug,base);
 if(c.status!=='draft'||c.directoryDraft!==true)throw new Error('Only directory-created drafts can be changed');
 return c;
}
export function updateDraft(slug,name,base=root){
 const c=editableDraft(slug,base);
 if(typeof name!=='string'||!name.trim()||name.length>80)throw new Error('Invalid name');
 c.name=name.trim();c.updatedAt=new Date().toISOString();
 const temp=path.join(base,slug,'.update.tmp');
 fs.writeFileSync(temp,JSON.stringify(c,null,2)+'\n',{flag:'wx',mode:0o600});
 fs.renameSync(temp,path.join(base,slug,'config.json'));return c;
}
export function deleteDraft(slug,confirmation,base=root){
 editableDraft(slug,base);if(confirmation!==slug)throw new Error('Confirmation required');
 fs.rmSync(path.join(base,slug),{recursive:true});
}
export function internalConfig(c) {return {...publicConfig(c),directoryDraft:c.directoryDraft===true,status:c.status==='live'?'live':'draft',domains:Array.isArray(c.domains)?c.domains.filter(x=>typeof x==='string'):[],updatedAt:string(c.updatedAt),botStatus:c.botID?'configured (not connected in preview)':'disabled'};}
