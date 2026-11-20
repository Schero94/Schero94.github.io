# plugin-io: Socket.IO real-time events for Strapi 5

> @strapi-community/plugin-io attaches a Socket.IO server to Strapi 5 and sends an event whenever a watched document is created, updated, published, unpublished, has its draft discarded or is deleted.

Each client receives only what its role or API token may read through the REST API, sanitized with the same Content API sanitizer Strapi uses.

The plugin lives in the Strapi community organization on GitHub. ComfortablyCoding started it; I maintain it and publish its releases on npm.

- Package: `@strapi-community/plugin-io` 6.0.4 (released 2026-11-18)
- Install: `npm install @strapi-community/plugin-io`
- Strapi: ^5.38.0; Node.js: ^22.21.0 || >=24.9.0 <=26.x.x
- License: MIT, free
- Documentation: https://strapi-community.github.io/plugin-io/
- Source on GitHub: https://github.com/strapi-community/plugin-io
- npm: https://www.npmjs.com/package/@strapi-community/plugin-io
- llms.txt: https://strapi-community.github.io/plugin-io/llms.txt
- Overview page: https://schero94.github.io/plugins/plugin-io/
- Last updated: 2026-11-19

## What it does

- Events for create, update, publish, unpublish, discard draft and delete, per watched content type.
- Every client gets only what its role or API token may read, sanitized like the REST API.
- Settings, Socket.IO in the admin with live monitoring, two homepage widgets and a live presence panel in the Content Manager.
- Several processes act as one Socket.IO server with the Postgres adapter (LISTEN/NOTIFY) or the Redis adapter.
- Users & Permissions is optional. It is needed for user JWTs and the Public role room.

## Use it when

Frontends need to react to content changes in Strapi without polling.

## Not for

Several processes without an adapter. Then events stay on the process that produced them, and the plugin warns at boot.

## What it needs

Strapi 5.38 or later and Node.js 22.21+ or 24.9+. For several processes: @socket.io/postgres-adapter with pg, or @socket.io/redis-adapter with ioredis.

## Questions

### Which events does it send?

An event when a watched document is created, updated, published, unpublished, has its draft discarded or is deleted, for example article:publish.

### Who receives an event?

Only clients whose role or API token may read that content through the REST API. Data is sanitized with Strapi's Content API sanitizer.

### Does it work on Railway or with pm2 cluster mode?

Yes, with the Postgres or Redis adapter and WebSocket-only transport, because Railway and pm2 have no sticky sessions.

This page is a short overview. Setup, configuration and the reference are on the documentation site. https://strapi-community.github.io/plugin-io/
