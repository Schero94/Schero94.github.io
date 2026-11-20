# Magic Link: Passwortloser Login für Strapi 5

> Magic Link ist ein Strapi-5-Plugin für passwortlosen Login.

Nutzer geben ihre E-Mail-Adresse ein, klicken auf den Link im Postfach und erhalten eine normale Users-&-Permissions-Session, dieselbe Art, die /api/auth/local erzeugt. Reicht ein Link nicht, kommt ein zweiter Faktor dazu: ein per E-Mail gesendeter Einmalcode oder eine Authenticator-App (TOTP) mit Backup-Codes.

- Paket: `strapi-plugin-magic-link-v5` 7.1.5 (veröffentlicht 2026-11-18)
- Installation: `npm install strapi-plugin-magic-link-v5`
- Strapi: ^5.50.0; Node.js: >=22.0.0 <=26.x.x
- Lizenz: MIT, kostenlos
- Dokumentation: https://schero94.github.io/strapi-plugin-magic-link-v5/
- Quellcode auf GitHub: https://github.com/Schero94/strapi-plugin-magic-link-v5
- npm: https://www.npmjs.com/package/strapi-plugin-magic-link-v5
- Übersichtsseite: https://schero94.github.io/de/plugins/magic-link/
- Stand: 2026-11-19

## Was es kann

- Ein API-Aufruf versendet den Link. Deine Landingpage tauscht das Token gegen ein JWT.
- Optionale zweite Faktoren: E-Mail-Code nach dem Klick, TOTP als optionale oder verpflichtende MFA, Einmal-Backup-Codes und Login nur mit TOTP.
- Links werden gehasht gespeichert und laufen ab. Ein Einmal-Link wird atomar verbraucht.
- Rate Limits pro IP und pro Adresse, IP-Sperren und eine JWT-Sessionliste mit Widerruf, auch für Refresh-Token-Sessions.
- Funktioniert mit dem Strapi-E-Mail-Plugin, Magic Mail, Email Designer 5 und einem Kompatibilitätsmodus für strapi-plugin-passwordless.
- Admin-Oberfläche auf Englisch, Deutsch, Französisch, Spanisch und Portugiesisch, hell und dunkel.

## Passt, wenn

Die Nutzer deiner App melden sich über Users & Permissions an und du willst E-Mail-Login ohne Passwort, mit oder ohne MFA.

## Nicht gedacht für

Es ersetzt nicht den Login des Strapi-Admins. Es arbeitet nur mit E-Mail: Versand über WhatsApp und SMS wurde in 6.0.0 entfernt.

## Was es braucht

Users & Permissions, einen eingerichteten Strapi-E-Mail-Provider (oder Magic Mail) und zwei Secrets mit mindestens 32 Zeichen: MAGIC_LINK_ENCRYPTION_KEY und MAGIC_LINK_OTP_PEPPER.

## Fragen

### Ersetzt Magic Link den Login des Strapi-Admins?

Nein. Es meldet die Nutzer deiner App an (Users-&-Permissions-Konten). Der Strapi-Admin-Login bleibt unverändert.

### Brauche ich ein Frontend?

Für eine gute Nutzererfahrung ja: ein Formular, das send-link aufruft, und eine Landingpage, die das Token an /login sendet. Jedes Framework geht, etwa Next.js, Nuxt oder SvelteKit.

### Funktioniert es mit GraphQL?

Die Login-Routen sind REST. Das zurückgegebene JWT gilt für GraphQL wie jedes Users-&-Permissions-JWT, widerrufene Tokens werden auch dort abgelehnt.

### Kann ich mehrere Strapi-Instanzen betreiben?

Ja. Der gesamte Zustand liegt in der Datenbank und wird sicher geteilt; getestet mit 8 Prozessen auf SQLite und PostgreSQL 16.

Diese Seite ist ein kurzer Überblick. Einrichtung, Konfiguration und Referenz stehen auf der Dokumentationsseite. https://schero94.github.io/strapi-plugin-magic-link-v5/
