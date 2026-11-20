# Magic Mail: E-mail routing and failover for Strapi 5

> Magic Mail is a Strapi 5 plugin that sends every Strapi e-mail through the right account.

It handles several SMTP and API accounts with routing rules, quotas, failover that never sends a mail twice, an outbox with retries, templates and delivery tracking. Your code keeps calling strapi.plugin('email').service('email').send(), and the Users & Permissions mails go through Magic Mail without changes.

- Package: `strapi-plugin-magic-mail` 4.10.0 (released 2026-11-19)
- Install: `npm install strapi-plugin-magic-mail`
- Strapi: ^5.57.0; Node.js: >=22.12.0 <=26.x.x
- License: MIT, free
- Documentation: https://schero94.github.io/Magic-Mail/
- Source on GitHub: https://github.com/Schero94/Magic-Mail
- npm: https://www.npmjs.com/package/strapi-plugin-magic-mail
- Overview page: https://schero94.github.io/plugins/magic-mail/
- Last updated: 2026-11-19

## What it does

- Six providers: Gmail, Microsoft 365 and Yahoo with OAuth 2.0, any SMTP server with optional DKIM, SendGrid and Mailgun. Credentials are encrypted with AES-256-GCM and never reach the browser.
- Routing rules by e-mail type, recipient, subject, template or a custom value, with a fallback account per rule.
- Hourly and daily quotas per account. Failover tries the next account only when the error proves the provider did not take the mail.
- An opt-in outbox with retries (after 1, 5 and 15 minutes by default) and idempotency keys.
- Templates in a visual editor (Unlayer) or plain HTML and text, with Mustache variables, versions, import and export.
- Provider templates from SendGrid and Mailgun with per-language versions, plus Brevo and Amazon SES accounts (beta).
- Strapi's password reset, email confirmation and admin password reset can use a SendGrid or Mailgun template, checked at startup, strict by default with an optional fallback.
- Signed SendGrid and Mailgun bounce and complaint webhooks, a delivery log, and open and click tracking with truncated IPs.

## Use it when

You send transactional mail from Strapi through more than one account or provider and need limits, failover or a delivery log.

## Not for

It sends e-mail only. Bounce webhooks exist for SendGrid and Mailgun, not for SMTP, Gmail, Microsoft 365 or Yahoo accounts.

## What it needs

Strapi 5.57.0 or newer with Users & Permissions. Outside development and test it needs an encryption key.

## Questions

### Do I have to change my existing e-mail code?

No. Magic Mail wraps the provider of @strapi/email at startup, so send(), sendTemplatedEmail(), the admin password reset and the Users & Permissions mails are routed through it.

### Can a mail be delivered twice?

Not because of Magic Mail's own retries. Failover only moves on when the provider provably did not take the mail, and the outbox never re-sends an uncertain mail on its own.

### Do I need Redis or sticky sessions for several replicas?

No. Quotas, rate limits, OAuth flows and the outbox are coordinated through the database. Redis is optional for the rate limiter.

### Is there a license key or a usage limit?

No. Magic Mail is MIT licensed with no license key and no usage limits.

This page is a short overview. Setup, configuration and the reference are on the documentation site. https://schero94.github.io/Magic-Mail/
