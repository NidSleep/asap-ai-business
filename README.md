# Wave AI — AI Sales Agents That Move Leads Forward

A mobile-first bilingual website for Wave AI (formerly ASEP). The site helps businesses identify where leads get stuck, shows how an AI sales agent advances the conversation, and hands the selected context safely to the Wave AI Telegram Agent.

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

## Local preview

```bash
python3 -m http.server 4173
```

Open http://localhost:4173.

## Structure

- `index.html` — content and semantic page structure
- `styles.css` — responsive visual system
- `script.js` — language switcher and diagnostic interaction

Internal identifiers from the earlier brand are intentionally unchanged so existing visitors, links and the bot keep working: the `asap-language` localStorage key, the deployment URL and the Telegram bot username. Only user-visible copy uses the Wave AI name.
- `vercel.json` — deployment and security headers

## Security

This repository contains no Telegram bot token, API key, customer database, OAuth credential, or Vercel project metadata. The Agent accepts only predefined diagnostic context keys; the model does not generate or select arbitrary URLs.

## Brand

Wave AI is the public product name (formerly ASEP). All website copy and design in this repository are original to Wave AI.
