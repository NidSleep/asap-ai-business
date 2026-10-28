# Wave Mind — AI Sales Agents That Move Leads Forward

A mobile-first bilingual website for Wave Mind (formerly Wave AI and ASEP). The site helps businesses identify where leads get stuck, shows how an AI sales agent advances the conversation, and hands the selected context safely to the Wave Mind Telegram Agent.

## Live website

https://asep-ai-business.vercel.app

## Product experience

- English and Chinese interface
- Interactive 60-second lead diagnostic
- Five sales-friction paths: slow replies, broken follow-up, weak qualification, booking drop-off, and poor visibility
- Safe Telegram deep links using allowlisted `/start` contexts
- Illustrative product frame: conversation thread, stage rail, live sales brief and confirmation-gated handoff
- Clear human-control and data-safety boundaries
- Responsive, reduced-motion-friendly static site
- Animated phone showcase with an industry switcher (beauty salon, property agency, tuition centre): answers from your data → qualifies → books or hands over → the team’s morning

## Stack

Next.js (App Router, static export) + Tailwind CSS v4 + Motion, with animated components from [beUI](https://beui.dev) installed through the shadcn registry (`components.json` → `@beui`).

## Local preview

```bash
npm install
npm run dev
```

Open http://localhost:3000. `npm run build` writes the static site to `out/`, which is what Vercel serves.

## Structure

- `app/` — layout, fonts and global theme (dark Wave Mind palette in `globals.css`)
- `components/site/` — the page: header, hero phone showcase, sections, chat pieces
- `components/motion/`, `components/agents/` — beUI components (Dynamic Island, Notification Stack, Swipeable List, Tabs, Bouncy Accordion, Message / Message Bubble, Button)
- `lib/content.ts` — all English and Chinese copy, Telegram link and allowlisted `/start` keys
- `lib/i18n.tsx` — language switch, saved under the existing `asap-language` key
- `vercel.json` — security headers. The CSP allows inline scripts and styles because Next.js bootstraps with inline scripts and Motion animates through inline styles; fonts are self-hosted, so Google Fonts is no longer allowed.

Add another beUI component with `npx shadcn@latest add @beui/<name>`.

Internal identifiers from the earlier brand are intentionally unchanged so existing visitors, links and the bot keep working: the `asap-language` localStorage key, the deployment URL and the Telegram bot username. Only user-visible copy uses the Wave Mind name.

## Security

This repository contains no Telegram bot token, API key, customer database, OAuth credential, or Vercel project metadata. The Agent accepts only predefined diagnostic context keys; the model does not generate or select arbitrary URLs.

## Brand

Wave Mind is the public product name (formerly Wave AI and ASEP). All website copy and design in this repository are original to Wave Mind.
