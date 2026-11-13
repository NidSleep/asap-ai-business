"use client";
import type {ComponentProps,ReactNode} from 'react';
import {ButtonLink} from '@/components/motion/button';
import {useBrand} from '@/lib/brand';
type Props=Omit<ComponentProps<typeof ButtonLink>,'href'|'target'|'rel'|'children'>&{children:ReactNode};
export function DemoLink({children,...rest}:Props){const brand=useBrand();return brand.contactCTA.url ? <ButtonLink href={brand.contactCTA.url} target="_blank" rel="noopener noreferrer" {...rest}>{children}</ButtonLink> : <button type="button" disabled aria-label="Contact pending — TODO" className={`inline-flex min-h-11 items-center justify-center rounded-full bg-neutral-200 px-4 py-2 text-neutral-600 cursor-not-allowed ${rest.className||''}`}>Contact pending</button>}
export function DemoHint({className}:{className?:string}){const brand=useBrand();return <p className={className}>{brand.contactCTA.url?'Opens the configured contact destination':'TODO: booking and contact details. No enquiries are submitted.'}</p>}
