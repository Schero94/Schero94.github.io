# Magic Mail: E-Mail-Routing und Failover für Strapi 5

> Magic Mail ist ein Strapi-5-Plugin, das jede Strapi-E-Mail über das passende Konto versendet.

Es verwaltet mehrere SMTP- und API-Konten mit Routing-Regeln, Kontingenten, einem Failover, das keine Mail doppelt verschickt, einer Outbox mit Wiederholungen, Templates und Zustellungs-Tracking. Dein Code ruft weiter strapi.plugin('email').service('email').send() auf, und die Mails von Users & Permissions laufen ohne Änderungen über Magic Mail.

- Paket: `strapi-plugin-magic-mail` 4.10.0 (veröffentlicht 2026-11-19)
- Installation: `npm install strapi-plugin-magic-mail`
- Strapi: ^5.57.0; Node.js: >=22.12.0 <=26.x.x
- Lizenz: MIT, kostenlos
- Dokumentation: https://schero94.github.io/Magic-Mail/
- Quellcode auf GitHub: https://github.com/Schero94/Magic-Mail
- npm: https://www.npmjs.com/package/strapi-plugin-magic-mail
- Übersichtsseite: https://schero94.github.io/de/plugins/magic-mail/
- Stand: 2026-11-19

## Was es kann

- Sechs Provider: Gmail, Microsoft 365 und Yahoo mit OAuth 2.0, jeder SMTP-Server mit optionalem DKIM, SendGrid und Mailgun. Zugangsdaten werden mit AES-256-GCM verschlüsselt und erreichen nie den Browser.
- Routing-Regeln nach E-Mail-Typ, Empfänger, Betreff, Template oder eigenem Wert, mit Ersatzkonto pro Regel.
- Stündliche und tägliche Kontingente pro Konto. Failover versucht das nächste Konto nur, wenn der Fehler belegt, dass der Provider die Mail nicht angenommen hat.
- Eine optionale Outbox mit Wiederholungen (standardmäßig nach 1, 5 und 15 Minuten) und Idempotency Keys.
- Templates im visuellen Editor (Unlayer) oder als HTML und Text, mit Mustache-Variablen, Versionen, Import und Export.
- Anbieter-Templates von SendGrid und Mailgun mit Sprachversionen, dazu Brevo- und Amazon-SES-Konten (Beta).
- Passwort-Reset, E-Mail-Bestätigung und Admin-Passwort-Reset von Strapi können ein SendGrid- oder Mailgun-Template nutzen, beim Start geprüft, standardmäßig strikt mit optionalem Fallback.
- Signierte Bounce- und Beschwerde-Webhooks für SendGrid und Mailgun, ein Versandprotokoll sowie Öffnungs- und Klick-Tracking mit gekürzten IPs.

## Passt, wenn

Du versendest Transaktionsmails aus Strapi über mehr als ein Konto oder einen Provider und brauchst Limits, Failover oder ein Versandprotokoll.

## Nicht gedacht für

Es versendet nur E-Mail. Bounce-Webhooks gibt es für SendGrid und Mailgun, nicht für SMTP-, Gmail-, Microsoft-365- oder Yahoo-Konten.

## Was es braucht

Strapi 5.57.0 oder neuer mit Users & Permissions. Außerhalb von Entwicklung und Test braucht es einen Verschlüsselungsschlüssel.

## Fragen

### Muss ich meinen bestehenden E-Mail-Code ändern?

Nein. Magic Mail umschließt beim Start den Provider von @strapi/email, daher laufen send(), sendTemplatedEmail(), der Passwort-Reset im Admin und die Mails von Users & Permissions darüber.

### Kann eine Mail doppelt zugestellt werden?

Nicht durch die eigenen Wiederholungen von Magic Mail. Failover wechselt nur, wenn der Provider die Mail nachweislich nicht angenommen hat, und die Outbox sendet eine unsichere Mail nie von selbst erneut.

### Brauche ich Redis oder Sticky Sessions für mehrere Replicas?

Nein. Kontingente, Rate Limits, OAuth-Abläufe und die Outbox werden über die Datenbank koordiniert. Redis ist für den Rate Limiter optional.

### Gibt es einen Lizenzschlüssel oder ein Nutzungslimit?

Nein. Magic Mail steht unter MIT-Lizenz, ohne Lizenzschlüssel und ohne Nutzungslimits.

Diese Seite ist ein kurzer Überblick. Einrichtung, Konfiguration und Referenz stehen auf der Dokumentationsseite. https://schero94.github.io/Magic-Mail/
