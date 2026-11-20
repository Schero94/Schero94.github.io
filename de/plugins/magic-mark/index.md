# Magic Mark: Gespeicherte Ansichten für den Strapi-5-Content-Manager

> Magic Mark ist ein Strapi-5-Plugin, das Listenansichten im Content Manager als Lesezeichen speichert.

Ein Lesezeichen merkt sich Inhaltstyp, Filter, Sortierung, Seitengröße, Suchtext und Locale und öffnet genau diese Liste mit einem Klick wieder. Lesezeichen lassen sich mit Rollen oder einzelnen Admins teilen und auf der Strapi-Startseite anpinnen.

- Paket: `strapi-plugin-magic-mark` 4.0.5 (veröffentlicht 2026-11-19)
- Installation: `npm install strapi-plugin-magic-mark`
- Strapi: ^5.57.0; Node.js: ^22.22.2 || >=24.15.0
- Lizenz: MIT, kostenlos
- Dokumentation: https://schero94.github.io/Magicmark/
- Quellcode auf GitHub: https://github.com/Schero94/Magicmark
- npm: https://www.npmjs.com/package/strapi-plugin-magic-mark
- Übersichtsseite: https://schero94.github.io/de/plugins/magic-mark/
- Stand: 2026-11-19

## Was es kann

- Ansicht speichern in der Werkzeugleiste der Listenansicht übernimmt die aktuelle Liste.
- Ein Lesezeichen öffnet seine Liste ohne Neuladen, alte Filter mischen sich nicht ein.
- Teilen privat, mit Rollen und einzelnen Admins oder mit allen Admins.
- Pins pro Nutzer, zuerst in der Werkzeugleiste und in einem Widget auf der Startseite.
- Erweiterte Filter: beliebige Bedingung, ist eines von, ist keines von, liegt zwischen sowie Felder von Relationen und nicht wiederholbaren Komponenten.
- Sechs Rollenrechte, bei jedem Request auf dem Server geprüft. Keine ausgehenden Anfragen, keine Telemetrie.

## Passt, wenn

Redakteure bauen jeden Tag dieselben gefilterten Listen nach oder speichern lange Admin-URLs als Browser-Lesezeichen.

## Nicht gedacht für

Seitenzahl und Spalten werden nicht gespeichert. Spalten bleiben eine Einstellung pro Nutzer im Content Manager.

## Was es braucht

Strapi 5.57.0 oder neuer.

## Fragen

### Ist Magic Mark kostenlos?

Ja. Das Lizenzsystem von 3.x ist entfernt; alle Funktionen stehen allen unter MIT-Lizenz zur Verfügung.

### Kann ich private Lesezeichen anderer Admins sehen?

Nein, auch nicht als Super Admin. Manager sehen öffentliche und geteilte Lesezeichen aller.

### Funktioniert es mit einer eigenen Admin-URL?

Ja. Lesezeichen speichern den Pfad innerhalb des Admins, nicht die volle URL.

Diese Seite ist ein kurzer Überblick. Einrichtung, Konfiguration und Referenz stehen auf der Dokumentationsseite. https://schero94.github.io/Magicmark/
