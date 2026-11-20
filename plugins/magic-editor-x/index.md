# Magic Editor X: Free block editor with live collaboration for Strapi 5

> Magic Editor X is a block editor for Strapi 5: an Editor.js custom field with Media Library uploads, custom blocks, version history, live collaboration across several servers and an optional AI assistant that uses your own provider.

It is free and open source under the MIT license, with no tiers, no license key and no usage limits.

- Package: `magic-editor-x` 2.7.0 (released 2026-11-19)
- Install: `npm install magic-editor-x`
- Strapi: ^5.38.0; Node.js: >=22.12.0 <=26.x.x
- License: MIT, free
- Documentation: https://schero94.github.io/Magic-Editor-X/
- Source on GitHub: https://github.com/Schero94/Magic-Editor-X
- npm: https://www.npmjs.com/package/magic-editor-x
- llms.txt: https://schero94.github.io/Magic-Editor-X/llms.txt
- Overview page: https://schero94.github.io/plugins/magic-editor-x/
- Last updated: 2026-11-19

## What it does

- A custom field, stored as JSON, for collection types, single types, components and dynamic zones, including localised fields and Draft & Publish.
- Block tools for text, code with syntax highlighting, tables, images and files from the Media Library, embeds, link previews, buttons and raw HTML.
- Custom blocks defined in Settings, either simple blocks with fields and an HTML template or embedded-entry blocks, with JSON import and export.
- Version history per field with preview and restore, and automatic versions during live sessions.
- Live collaboration with character-level merging and presence, across several Node processes behind a load balancer without sticky sessions or Redis.
- An entry side panel that shows who else is editing, protection for unsaved changes, blocks inserted from another entry, signed URLs for private upload providers and optional MCP tools for AI clients.
- Content-Type Builder components as blocks, a columns block, typed text kept when your session ends, and Live Preview that jumps to the clicked block in the editor.
- Optional Core Blocks bridge: custom blocks you add to Strapi's own Blocks field can be saved and published, validated by your schema; it switches itself off once Strapi supports this natively.
- An AI assistant that uses Anthropic, OpenAI or any OpenAI-compatible server with your own key; every value is normalised and sanitised on the server when it is saved.

## Use it when

Editors want block-based editing with structured JSON output, and several people edit the same entry at the same time.

## Not for

Projects that want HTML or Markdown stored directly in the field. The field stores Editor.js JSON, and your frontend renders the blocks.

## What it needs

Strapi 5 and its Content-Type Builder. The AI assistant needs your own provider key; collaboration behind a proxy needs WebSocket upgrades and the same ADMIN_JWT_SECRET on every process.

## Questions

### Is Magic Editor X free?

Yes. It is MIT licensed. Every feature is available in every installation, with nothing to activate, no tiers and no usage limits.

### Does it call external services?

Only for features that need it: link previews, images by URL and the AI assistant with the provider you configure.

### Can several admins edit one field at the same time?

Yes. Collaboration merges edits at character level and works with several Node processes on one database without sticky sessions.

### What does it store?

JSON blocks from Editor.js, not HTML. Your frontend renders the blocks.

This page is a short overview. Setup, configuration and the reference are on the documentation site. https://schero94.github.io/Magic-Editor-X/
