"use client";
import {useBrand} from '@/lib/brand';
export function WaveMark({className,tone='light'}:{className?:string;tone?:'light'|'dark'}){const brand=useBrand();return brand.logo ? <img src={brand.logo} alt={`${brand.name} logo`} className={className} style={{maxWidth:96,maxHeight:32,width:'auto',filter:tone==='dark'?'brightness(0) invert(1)':undefined}}/> : null;}
