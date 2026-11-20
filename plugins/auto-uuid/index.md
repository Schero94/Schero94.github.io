# Auto UUID: Server-generated UUID field for Strapi 5

> Auto UUID is a Strapi 5 custom field that generates UUID v4 or v7 values on the server.

No other document can reuse a value and nobody changes it by accident. Add the field in the Content-Type Builder and every new entry gets a value, whether it came from the admin, REST, GraphQL or the Document Service.

- Package: `strapi-auto-uuid-v5` 2.1.3 (released 2026-11-18)
- Install: `npm install strapi-auto-uuid-v5`
- Strapi: ^5.24.0; Node.js: >=22.12.0 <=26.x.x
- License: MIT, free
- Documentation: https://schero94.github.io/strapi-auto-uuid/
- Source on GitHub: https://github.com/Schero94/strapi-auto-uuid
- npm: https://www.npmjs.com/package/strapi-auto-uuid-v5
- Overview page: https://schero94.github.io/plugins/auto-uuid/
- Last updated: 2026-11-19

## What it does

- UUID v4 (random) or v7 (time-sortable), with an optional prefix such as usr_.
- Generated on the server when an entry is created.
- Uniqueness across documents, checked on every save in every locale and in draft and published versions. Compared case-insensitively per RFC 9562.
- Locked by default; editing can be allowed per field.
- A settings page with counts per content type, a check, repairs with preview and confirmation, and export and import of all UUIDs.
- The Strapi 5 continuation of Cringe-Studio/strapi-auto-uuid, which supports Strapi 4 only.

## Use it when

You need a stable identifier per entry that the server generates and keeps unique.

## Not for

Strapi 4 projects. For those, use Cringe-Studio/strapi-auto-uuid.

## What it needs

Strapi 5.24 or newer. SQLite, PostgreSQL and MySQL 8 or MariaDB.

## Questions

### Which UUID versions does it generate?

UUID v4 (random) or v7 (time-sortable), chosen per field, with an optional prefix.

### Does it work with several Strapi processes?

Yes. The database is the only shared state, so Railway replicas and pm2 clusters on one database are safe.

### Does it call external services?

No. It makes no outbound network calls, has no telemetry and needs no license key.

This page is a short overview. Setup, configuration and the reference are on the documentation site. https://schero94.github.io/strapi-auto-uuid/
