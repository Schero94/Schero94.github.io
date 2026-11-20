# Magic MessageGate: WhatsApp, Telegram and SMS for Strapi 5

> Magic MessageGate is a Strapi 5 plugin that sends template messages over WhatsApp, Telegram and SMS.

It picks the channel, fills in the variables, sends each message exactly once and follows it from sent to delivered to read. When WhatsApp cannot reach a number, it falls back to SMS, or to e-mail through Magic Mail. It only uses the official provider APIs, so there is no WhatsApp Web session that can get your number banned.

- Package: `strapi-plugin-magic-messagegate` 1.2.0 (released 2026-11-20)
- Install: `npm install strapi-plugin-magic-messagegate`
- Strapi: ^5.38.0; Node.js: ^22.21.0 || >=24.9.0 <=26.x.x
- License: MIT, free
- Documentation: https://schero94.github.io/Magic-MessageGate/
- Source on GitHub: https://github.com/Schero94/Magic-MessageGate
- npm: https://www.npmjs.com/package/strapi-plugin-magic-messagegate
- llms.txt: https://schero94.github.io/Magic-MessageGate/llms.txt
- Overview page: https://schero94.github.io/plugins/magic-messagegate/
- Last updated: 2026-11-20

## What it does

- WhatsApp through Meta's Cloud API, Telegram through the Bot API, SMS through seven.io or Twilio. Each provider is a small HTTPS client, no vendor SDKs.
- Templates with variables and a live preview. WhatsApp templates are submitted to Meta from Strapi and their approval status updates by itself.
- A durable outbox in your database: each message is sent once, also with several Strapi processes, and the same idempotencyKey never sends twice.
- A timeline per message: queued, sent, delivered, read, or failed with a reason in plain language.
- A fallback chain from WhatsApp to SMS to e-mail, and routing rules per template, tag or country.
- Consent per channel, STOP keywords, and GDPR export and erasure per contact.

## Use it when

Your Strapi app sends order, booking or account notifications to phones and needs delivery status and a fallback.

## Not for

Checking before the first send whether a number has WhatsApp, or connecting a personal WhatsApp number. The official API allows neither.

## What it needs

Strapi 5.38 or newer, an encryption key and a public URL for provider webhooks. WhatsApp needs a Meta app.

## Questions

### Can MessageGate check whether a number has WhatsApp before sending?

No. Meta's Cloud API has no such check. MessageGate learns it from the first send and falls back to SMS.

### Why is a message marked uncertain?

The request reached the provider but no clear answer came back in time. Sending again could deliver it twice, so an admin decides whether to retry or mark it as sent.

### Can I send free text on WhatsApp?

Only within 24 hours after the contact last wrote to you. Outside that window, Meta requires an approved template.

### Do I need Magic Mail?

No. It is only used for the optional e-mail step of the fallback chain.

This page is a short overview. Setup, configuration and the reference are on the documentation site. https://schero94.github.io/Magic-MessageGate/
