# Magic Session Manager: See and end user sessions in Strapi 5

> Magic Session Manager is a Strapi 5 plugin that records every sign-in through Users & Permissions as a session.

Admins see who is online, end single sessions or all sessions of a user, block accounts and review sign-in history. Your app gets logout routes, a list of the user's own devices, failed-login lockout and optional country rules.

- Package: `strapi-plugin-magic-sessionmanager` 4.14.2 (released 2026-11-18)
- Install: `npm install strapi-plugin-magic-sessionmanager`
- Strapi: ^5.50.0; Node.js: ^22.22.2 || >=24.15.0
- License: MIT, free
- Documentation: https://schero94.github.io/Magic-Sessionmanager/
- Source on GitHub: https://github.com/Schero94/Magic-Sessionmanager
- npm: https://www.npmjs.com/package/strapi-plugin-magic-sessionmanager
- Overview page: https://schero94.github.io/plugins/magic-sessionmanager/
- Last updated: 2026-11-19

## What it does

- A sessions dashboard with Active, Idle and Ended counts, search, filters, CSV and JSON export and a details dialog per session.
- End one session or all sessions of a user, or block the user. An ended session is rejected on the next request with 401.
- Content API routes for my sessions, the current session, log out, log out everywhere and log out other devices.
- Temporary IP lockout after failed sign-ins, rate limits, optional rejection of VPN, proxy or low-score sign-ins, and country allow or block lists.
- IP location from a local MaxMind GeoLite2 database, from ipapi.co, or turned off.
- Works with jwtManagement: 'refresh' (Strapi's own sessions and refresh tokens) and with 'legacy-support'.

## Use it when

You need to see and end the sessions of your app's users, or stop password guessing before it reaches them.

## Not for

It does not manage Strapi administrator sessions.

## What it needs

Strapi 5 with Users & Permissions. The homepage widget needs Strapi 5.13 or later. In production it needs a stable key for token encryption.

## Questions

### Does it manage Strapi admin accounts?

No. It manages end users of Users & Permissions. Strapi administrator sessions are out of scope.

### Does it work with jwtManagement: 'refresh'?

Yes. Strapi issues, rotates and revokes its own sessions; the plugin adds device, IP address, location and history, and ends the native session when you end it in the admin.

### Can I run it on Railway with several replicas or with pm2 in cluster mode?

Yes, with PostgreSQL or MySQL shared by all processes. No sticky sessions or Redis are needed.

### Does it send my users' IP addresses anywhere?

Only if the location lookup uses ipapi.co. With a local MaxMind database, or with lookup disabled, IP addresses stay on your server.

This page is a short overview. Setup, configuration and the reference are on the documentation site. https://schero94.github.io/Magic-Sessionmanager/
