"use client";
import {createContext,useContext,type ReactNode} from 'react';
export type BrandConfig={slug:string;name:string;logo:string|null;favicon:string|null;colors:Record<string,string>;contacts:Record<string,string|null>;contactCTA:{label:string;url:string|null};webCTA?:{label:string;url:string|null};botID:string|null;analyticsID:string|null;showEvidence:boolean;showPricing:boolean;identityPending:boolean};
const Context=createContext<BrandConfig|null>(null);
export function BrandProvider({brand,children}:{brand:BrandConfig;children:ReactNode}){return <Context.Provider value={brand}>{children}</Context.Provider>}
export function useBrand(){const brand=useContext(Context);if(!brand)throw new Error('Brand context required');return brand}
