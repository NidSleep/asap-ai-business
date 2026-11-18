// Curated metadata only. Sources and verification are recorded in PROJECTS.md.
// No brand JSON, customer data or runtime configuration is sent to the launcher.
const host='https://asep-radxa.tail435239.ts.net';
export const projects=Object.freeze([
 {name:'ASEP demo use',type:'ASEP',description:'Business demo and published Studio chat.',links:[['Landing','https://asep-demo-landing.vercel.app'],['Chat',host+'/bot-studio/chat/acp-5e96be'],['Web demo',host+'/asep-demo/'],['Telegram','https://t.me/ASEP_Demobot'],['Admin',host+'/asep-demo-crm/'],['Studio',host+'/bot-studio/']]},
 {name:'Wave AI',type:'Client',description:'Client website, Telegram and protected admin.',links:[['Landing','https://asep-ai-business.vercel.app'],['Telegram','https://t.me/presale_copyabc_bot'],['Admin',host+'/admin']]},
]);
// Exact destinations, not a user-controlled redirect service.
export const allowedDestinations=new Set(projects.flatMap(p=>p.links.map(([,href])=>href)));
export function safeProjectHref(href){if(!allowedDestinations.has(href)||new URL(href).protocol!=='https:')throw Error('Unapproved project destination');return href;}
