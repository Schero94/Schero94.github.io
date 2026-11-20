# Magic Editor X: Kostenloser Blockeditor mit Live-Zusammenarbeit für Strapi 5

> Magic Editor X ist ein Blockeditor für Strapi 5: ein Editor.js-Custom-Field mit Uploads in die Medienbibliothek, eigenen Blöcken, Versionsverlauf, Live-Zusammenarbeit über mehrere Server und einem optionalen KI-Assistenten mit deinem eigenen Provider.

Er ist kostenlos und Open Source unter MIT-Lizenz, ohne Stufen, ohne Lizenzschlüssel und ohne Nutzungslimits.

- Paket: `magic-editor-x` 2.7.0 (veröffentlicht 2026-11-19)
- Installation: `npm install magic-editor-x`
- Strapi: ^5.38.0; Node.js: >=22.12.0 <=26.x.x
- Lizenz: MIT, kostenlos
- Dokumentation: https://schero94.github.io/Magic-Editor-X/
- Quellcode auf GitHub: https://github.com/Schero94/Magic-Editor-X
- npm: https://www.npmjs.com/package/magic-editor-x
- llms.txt: https://schero94.github.io/Magic-Editor-X/llms.txt
- Übersichtsseite: https://schero94.github.io/de/plugins/magic-editor-x/
- Stand: 2026-11-19

## Was es kann

- Ein Custom Field, als JSON gespeichert, für Collection Types, Single Types, Komponenten und Dynamic Zones, inklusive lokalisierter Felder und Draft & Publish.
- Block-Werkzeuge für Text, Code mit Syntax-Highlighting, Tabellen, Bilder und Dateien aus der Medienbibliothek, Einbettungen, Link-Vorschauen, Buttons und Raw HTML.
- Eigene Blöcke in den Einstellungen, entweder einfache Blöcke mit Feldern und HTML-Template oder Blöcke mit eingebettetem Eintrag, mit JSON-Import und -Export.
- Versionsverlauf pro Feld mit Vorschau und Wiederherstellung sowie automatischen Versionen während Live-Sitzungen.
- Live-Zusammenarbeit mit Zusammenführung auf Zeichenebene und Anwesenheitsanzeige, über mehrere Node-Prozesse hinter einem Load Balancer ohne Sticky Sessions oder Redis.
- Ein Seitenpanel am Eintrag, das zeigt, wer gerade mitarbeitet, Schutz für ungespeicherte Änderungen, Blöcke aus einem anderen Eintrag, signierte URLs für private Upload-Anbieter und optionale MCP-Werkzeuge für KI-Clients.
- Komponenten aus dem Content-Type Builder als Blöcke, ein Spalten-Block, getippter Text bleibt erhalten, wenn die Sitzung endet, und Live Preview springt zum angeklickten Block im Editor.
- Optionale Core-Blocks-Brücke: eigene Blöcke im Strapi-eigenen Blocks-Feld lassen sich speichern und veröffentlichen, geprüft mit deinem Schema; sie schaltet sich ab, sobald Strapi das selbst kann.
- Ein KI-Assistent mit Anthropic, OpenAI oder einem OpenAI-kompatiblen Server und deinem eigenen Schlüssel; jeder Wert wird beim Speichern auf dem Server normalisiert und bereinigt.

## Passt, wenn

Redakteure wollen blockbasiert arbeiten, mit strukturierter JSON-Ausgabe, und mehrere Personen bearbeiten denselben Eintrag gleichzeitig.

## Nicht gedacht für

Projekte, die HTML oder Markdown direkt im Feld speichern wollen. Das Feld speichert Editor.js-JSON, und dein Frontend rendert die Blöcke.

## Was es braucht

Strapi 5 mit dem Content-Type Builder. Der KI-Assistent braucht deinen eigenen Provider-Schlüssel; Zusammenarbeit hinter einem Proxy braucht WebSocket-Upgrades und dasselbe ADMIN_JWT_SECRET in jedem Prozess.

## Fragen

### Ist Magic Editor X kostenlos?

Ja. Er steht unter MIT-Lizenz. Jede Funktion ist in jeder Installation verfügbar, ohne Aktivierung, ohne Stufen und ohne Nutzungslimits.

### Ruft er externe Dienste auf?

Nur für Funktionen, die das brauchen: Link-Vorschauen, Bilder per URL und den KI-Assistenten mit dem Provider, den du einstellst.

### Können mehrere Admins gleichzeitig ein Feld bearbeiten?

Ja. Die Zusammenarbeit führt Änderungen auf Zeichenebene zusammen und läuft mit mehreren Node-Prozessen auf einer Datenbank ohne Sticky Sessions.

### Was speichert er?

JSON-Blöcke von Editor.js, kein HTML. Dein Frontend rendert die Blöcke.

Diese Seite ist ein kurzer Überblick. Einrichtung, Konfiguration und Referenz stehen auf der Dokumentationsseite. https://schero94.github.io/Magic-Editor-X/
