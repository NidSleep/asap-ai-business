import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {Header} from '@/components/site/header';
import {Faq,Features,Finale,Hero,Levels,Pain,Pricing,Proof} from '@/components/site/sections';
import {BrandProvider,type BrandConfig} from '@/lib/brand';
import {LangProvider} from '@/lib/i18n';
import {loadBrand,publicConfig} from '@/server/brands.mjs';
export const dynamic='force-dynamic';
async function getBrand(params:Promise<{brand:string}>):Promise<BrandConfig>{try{return publicConfig(loadBrand((await params).brand)) as BrandConfig}catch{notFound()}}
export async function generateMetadata({params}:{params:Promise<{brand:string}>}):Promise<Metadata>{const b=await getBrand(params);const title=`${b.name} — Your AI Sales Team`;const description=`${b.name} AI sales systems. Draft preview; contact details pending.`;return {title,description,openGraph:{title,description,siteName:b.name,type:'website'},twitter:{card:'summary',title,description},icons:b.favicon?{icon:b.favicon}:{},robots:{index:false,follow:false}}}
export default async function Landing({params}:{params:Promise<{brand:string}>}){
 const b=await getBrand(params);const c=b.colors;
 const style={'--brand':c.brand,'--brand-strong':c.brandStrong,'--brand-light':c.brandLight,'--ink':c.ink,'--ink-soft':c.inkSoft,'--foreground':c.ink,'--background':c.background,'--muted':c.muted,'--secondary':c.muted,'--border':c.border,'--primary':c.brand,'--ring':c.brand,'--signal':c.brand,'--signal-soft':`${c.brand}20`,'--font-bricolage':'Arial','--font-instrument':'Arial'} as React.CSSProperties;
 return <BrandProvider brand={b}><LangProvider><div style={style} data-brand={b.slug}><Header/>{b.identityPending?<aside className="mx-auto max-w-[1200px] px-safe py-3 text-sm" role="note">Draft preview · Official logo, favicon and logo-derived colours pending. Contact and bot connections are disabled.</aside>:null}<main id="main" tabIndex={-1} className="outline-none"><Hero/><Pain/><Levels/><Features/>{b.showEvidence?<Proof/>:null}{b.showPricing?<Pricing/>:null}<Faq/></main><Finale/></div></LangProvider></BrandProvider>
}
