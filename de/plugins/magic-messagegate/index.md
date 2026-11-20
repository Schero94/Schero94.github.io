# Magic MessageGate: WhatsApp, Telegram und SMS für Strapi 5

> Magic MessageGate ist ein Strapi-5-Plugin, das Template-Nachrichten über WhatsApp, Telegram und SMS versendet.

Es wählt den Kanal, füllt die Variablen, sendet jede Nachricht genau einmal und verfolgt sie von gesendet über zugestellt bis gelesen. Erreicht WhatsApp eine Nummer nicht, weicht es auf SMS aus oder über Magic Mail auf E-Mail. Es nutzt nur die offiziellen Provider-APIs, also gibt es keine WhatsApp-Web-Session, die deine Nummer sperren lassen kann.

- Paket: `strapi-plugin-magic-messagegate` 1.2.0 (veröffentlicht 2026-11-20)
- Installation: `npm install strapi-plugin-magic-messagegate`
- Strapi: ^5.38.0; Node.js: ^22.21.0 || >=24.9.0 <=26.x.x
- Lizenz: MIT, kostenlos
- Dokumentation: https://schero94.github.io/Magic-MessageGate/
- Quellcode auf GitHub: https://github.com/Schero94/Magic-MessageGate
- npm: https://www.npmjs.com/package/strapi-plugin-magic-messagegate
- llms.txt: https://schero94.github.io/Magic-MessageGate/llms.txt
- Übersichtsseite: https://schero94.github.io/de/plugins/magic-messagegate/
- Stand: 2026-11-20

## Was es kann

- WhatsApp über Metas Cloud API, Telegram über die Bot API, SMS über seven.io oder Twilio. Jeder Provider ist ein kleiner HTTPS-Client, ohne Hersteller-SDKs.
- Templates mit Variablen und Live-Vorschau. WhatsApp-Templates werden aus Strapi bei Meta eingereicht, ihr Freigabestatus aktualisiert sich selbst.
- Eine dauerhafte Outbox in deiner Datenbank: Jede Nachricht wird einmal gesendet, auch mit mehreren Strapi-Prozessen, und derselbe idempotencyKey sendet nie doppelt.
- Ein Verlauf pro Nachricht: wartend, gesendet, zugestellt, gelesen oder fehlgeschlagen mit verständlichem Grund.
- Eine Fallback-Kette von WhatsApp über SMS zu E-Mail und Routing-Regeln pro Template, Tag oder Land.
- Einwilligung pro Kanal, STOP-Schlüsselwörter sowie DSGVO-Export und Löschung pro Kontakt.

## Passt, wenn

Deine Strapi-App schickt Bestell-, Buchungs- oder Kontobenachrichtigungen aufs Telefon und braucht Zustellstatus und Fallback.

## Nicht gedacht für

Vor dem ersten Versand prüfen, ob eine Nummer WhatsApp hat, oder eine private WhatsApp-Nummer verbinden. Die offizielle API erlaubt beides nicht.

## Was es braucht

Strapi 5.38 oder neuer, ein Verschlüsselungsschlüssel und eine öffentliche URL für Provider-Webhooks. WhatsApp braucht eine Meta-App.

## Fragen

### Kann MessageGate vor dem Senden prüfen, ob eine Nummer WhatsApp hat?

Nein. Metas Cloud API bietet diese Prüfung nicht. MessageGate lernt es beim ersten Versand und weicht auf SMS aus.

### Warum ist eine Nachricht als unsicher markiert?

Die Anfrage hat den Provider erreicht, aber keine eindeutige Antwort kam rechtzeitig zurück. Erneutes Senden könnte doppelt zustellen, daher entscheidet ein Admin, ob wiederholt oder als gesendet markiert wird.

### Kann ich auf WhatsApp freien Text senden?

Nur innerhalb von 24 Stunden, nachdem der Kontakt dir zuletzt geschrieben hat. Außerhalb dieses Fensters verlangt Meta ein freigegebenes Template.

### Brauche ich Magic Mail?

Nein. Es wird nur für den optionalen E-Mail-Schritt der Fallback-Kette genutzt.

Diese Seite ist ein kurzer Überblick. Einrichtung, Konfiguration und Referenz stehen auf der Dokumentationsseite. https://schero94.github.io/Magic-MessageGate/
