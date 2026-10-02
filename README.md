# ASAP — AI Sales Agents That Move Leads Forward

A mobile-first bilingual website for ASAP (AI Solve All Problem). The site helps businesses identify where leads get stuck, shows how an AI sales agent advances the conversation, and hands the selected context safely to the ASAP Telegram Agent.

## Live website

https://asap-ai-business.vercel.app

## Product experience

- English and Chinese interface
- Interactive 60-second lead diagnostic
- Five sales-friction paths: slow replies, broken follow-up, weak qualification, booking drop-off, and poor visibility
- Safe Telegram deep links using allowlisted `/start` contexts
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
- `vercel.json` — deployment and security headers

## Security

This repository contains no Telegram bot token, API key, customer database, OAuth credential, or Vercel project metadata. The Agent accepts only predefined diagnostic context keys; the model does not generate or select arbitrary URLs.

## Brand

ASAP and AI Solve All Problem are ASAP brand names. All website copy and design in this repository are original to ASAP.
