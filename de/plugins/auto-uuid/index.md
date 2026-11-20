# Auto UUID: Serverseitig erzeugtes UUID-Feld für Strapi 5

> Auto UUID ist ein Strapi-5-Custom-Field, das UUID-v4- oder v7-Werte auf dem Server erzeugt.

Kein anderes Dokument kann einen Wert wiederverwenden, und niemand ändert ihn aus Versehen. Füge das Feld im Content-Type Builder hinzu, und jeder neue Eintrag erhält einen Wert, egal ob er aus dem Admin, über REST, GraphQL oder den Document Service kommt.

- Paket: `strapi-auto-uuid-v5` 2.1.3 (veröffentlicht 2026-11-18)
- Installation: `npm install strapi-auto-uuid-v5`
- Strapi: ^5.24.0; Node.js: >=22.12.0 <=26.x.x
- Lizenz: MIT, kostenlos
- Dokumentation: https://schero94.github.io/strapi-auto-uuid/
- Quellcode auf GitHub: https://github.com/Schero94/strapi-auto-uuid
- npm: https://www.npmjs.com/package/strapi-auto-uuid-v5
- Übersichtsseite: https://schero94.github.io/de/plugins/auto-uuid/
- Stand: 2026-11-19

## Was es kann

- UUID v4 (zufällig) oder v7 (zeitlich sortierbar), mit optionalem Präfix wie usr_.
- Auf dem Server erzeugt, wenn ein Eintrag angelegt wird.
- Eindeutig über Dokumente hinweg, bei jedem Speichern geprüft, in jeder Locale sowie in Entwurf und veröffentlichter Version. Vergleich ohne Groß- und Kleinschreibung nach RFC 9562.
- Standardmäßig gesperrt; Bearbeiten lässt sich pro Feld erlauben.
- Eine Einstellungsseite mit Zählern pro Inhaltstyp, Prüfung, Reparaturen mit Vorschau und Bestätigung sowie Export und Import aller UUIDs.
- Die Strapi-5-Fortsetzung von Cringe-Studio/strapi-auto-uuid, das nur Strapi 4 unterstützt.

## Passt, wenn

Du brauchst pro Eintrag eine feste Kennung, die der Server erzeugt und eindeutig hält.

## Nicht gedacht für

Strapi-4-Projekte. Dafür gibt es Cringe-Studio/strapi-auto-uuid.

## Was es braucht

Strapi 5.24 oder neuer. SQLite, PostgreSQL und MySQL 8 oder MariaDB.

## Fragen

### Welche UUID-Versionen erzeugt es?

UUID v4 (zufällig) oder v7 (zeitlich sortierbar), pro Feld wählbar, mit optionalem Präfix.

### Funktioniert es mit mehreren Strapi-Prozessen?

Ja. Die Datenbank ist der einzige geteilte Zustand, daher sind Railway-Replicas und pm2-Cluster auf einer Datenbank sicher.

### Ruft es externe Dienste auf?

Nein. Es macht keine ausgehenden Netzwerkaufrufe, hat keine Telemetrie und braucht keinen Lizenzschlüssel.

Diese Seite ist ein kurzer Überblick. Einrichtung, Konfiguration und Referenz stehen auf der Dokumentationsseite. https://schero94.github.io/strapi-auto-uuid/
