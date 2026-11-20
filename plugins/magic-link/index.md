# Magic Link: Passwordless login for Strapi 5

> Magic Link is a Strapi 5 plugin for passwordless login.

Your users type their e-mail address, click the link in their inbox and get a normal Users & Permissions session, the same kind /api/auth/local creates. When a link is not enough, you add a second factor: an e-mailed one-time code or an authenticator app (TOTP) with backup codes.

- Package: `strapi-plugin-magic-link-v5` 7.1.5 (released 2026-11-18)
- Install: `npm install strapi-plugin-magic-link-v5`
- Strapi: ^5.50.0; Node.js: >=22.0.0 <=26.x.x
- License: MIT, free
- Documentation: https://schero94.github.io/strapi-plugin-magic-link-v5/
- Source on GitHub: https://github.com/Schero94/strapi-plugin-magic-link-v5
- npm: https://www.npmjs.com/package/strapi-plugin-magic-link-v5
- Overview page: https://schero94.github.io/plugins/magic-link/
- Last updated: 2026-11-19

## What it does

- One API call sends the link. Your landing page exchanges the token for a JWT.
- Optional second factors: an e-mail code after the click, TOTP as optional or required MFA, one-time backup codes, and TOTP-only login.
- Links are stored hashed and expire. A single-use link is consumed atomically.
- Rate limits per IP and per address, IP bans, and a JWT session list with revocation, also for refresh-token sessions.
- Works with the Strapi e-mail plugin, Magic Mail, Email Designer 5 and a compatibility mode for strapi-plugin-passwordless.
- Admin panel in English, German, French, Spanish and Portuguese, in light and dark mode.

## Use it when

The end users of your app sign in through Users & Permissions and you want e-mail login without passwords, with or without MFA.

## Not for

It does not replace the Strapi admin login. It is e-mail only: WhatsApp and SMS delivery were removed in 6.0.0.

## What it needs

Users & Permissions, a configured Strapi e-mail provider (or Magic Mail) and two secrets of 32 or more characters: MAGIC_LINK_ENCRYPTION_KEY and MAGIC_LINK_OTP_PEPPER.

## Questions

### Does Magic Link replace the Strapi admin login?

No. It signs in the users of your app (Users & Permissions accounts). The Strapi admin login stays as it is.

### Do I need a frontend?

For a good experience, yes: a form that calls send-link and a landing page that posts the token to /login. Any framework works, for example Next.js, Nuxt or SvelteKit.

### Does it work with GraphQL?

The login routes are REST. The JWT they return works for GraphQL like any Users & Permissions JWT, and revoked tokens are rejected there too.

### Can I run several Strapi instances?

Yes. All state lives in the database and is shared safely; the behaviour is tested with 8 processes on SQLite and PostgreSQL 16.

This page is a short overview. Setup, configuration and the reference are on the documentation site. https://schero94.github.io/strapi-plugin-magic-link-v5/
