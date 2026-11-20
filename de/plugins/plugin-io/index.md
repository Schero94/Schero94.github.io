# plugin-io: Socket.IO-Echtzeit-Events für Strapi 5

> @strapi-community/plugin-io hängt einen Socket.IO-Server an Strapi 5 und sendet ein Event, sobald ein beobachtetes Dokument erstellt, geändert, veröffentlicht, zurückgezogen, sein Entwurf verworfen oder es gelöscht wird.

Jeder Client erhält nur, was seine Rolle oder sein API-Token über die REST-API lesen darf, bereinigt mit demselben Content-API-Sanitizer, den Strapi nutzt.

Das Plugin liegt in der Strapi-Community-Organisation auf GitHub. ComfortablyCoding hat es begonnen; ich pflege es und veröffentliche die Releases auf npm.

- Paket: `@strapi-community/plugin-io` 6.0.4 (veröffentlicht 2026-11-18)
- Installation: `npm install @strapi-community/plugin-io`
- Strapi: ^5.38.0; Node.js: ^22.21.0 || >=24.9.0 <=26.x.x
- Lizenz: MIT, kostenlos
- Dokumentation: https://strapi-community.github.io/plugin-io/
- Quellcode auf GitHub: https://github.com/strapi-community/plugin-io
- npm: https://www.npmjs.com/package/@strapi-community/plugin-io
- llms.txt: https://strapi-community.github.io/plugin-io/llms.txt
- Übersichtsseite: https://schero94.github.io/de/plugins/plugin-io/
- Stand: 2026-11-19

## Was es kann

- Events für Erstellen, Ändern, Veröffentlichen, Zurückziehen, Entwurf verwerfen und Löschen, pro beobachtetem Inhaltstyp.
- Jeder Client erhält nur, was seine Rolle oder sein API-Token lesen darf, bereinigt wie die REST-API.
- Einstellungen, Socket.IO im Admin mit Live-Monitoring, zwei Startseiten-Widgets und eine Live-Präsenz im Content Manager.
- Mehrere Prozesse arbeiten als ein Socket.IO-Server mit dem Postgres-Adapter (LISTEN/NOTIFY) oder dem Redis-Adapter.
- Users & Permissions ist optional. Es wird für Nutzer-JWTs und den Raum der Public-Rolle gebraucht.

## Passt, wenn

Frontends sollen auf Inhaltsänderungen in Strapi reagieren, ohne zu pollen.

## Nicht gedacht für

Mehrere Prozesse ohne Adapter. Dann bleiben Events auf dem Prozess, der sie erzeugt hat, und das Plugin warnt beim Start.

## Was es braucht

Strapi 5.38 oder neuer und Node.js 22.21+ oder 24.9+. Für mehrere Prozesse: @socket.io/postgres-adapter mit pg oder @socket.io/redis-adapter mit ioredis.

## Fragen

### Welche Events sendet es?

Ein Event, wenn ein beobachtetes Dokument erstellt, geändert, veröffentlicht, zurückgezogen, sein Entwurf verworfen oder es gelöscht wird, zum Beispiel article:publish.

### Wer erhält ein Event?

Nur Clients, deren Rolle oder API-Token diesen Inhalt über die REST-API lesen darf. Daten werden mit Strapis Content-API-Sanitizer bereinigt.

### Läuft es auf Railway oder mit pm2 im Cluster-Modus?

Ja, mit dem Postgres- oder Redis-Adapter und reinem WebSocket-Transport, weil Railway und pm2 keine Sticky Sessions haben.

Diese Seite ist ein kurzer Überblick. Einrichtung, Konfiguration und Referenz stehen auf der Dokumentationsseite. https://strapi-community.github.io/plugin-io/
