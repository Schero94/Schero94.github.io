# Magic Session Manager: Nutzer-Sessions in Strapi 5 sehen und beenden

> Magic Session Manager ist ein Strapi-5-Plugin, das jede Anmeldung über Users & Permissions als Session erfasst.

Admins sehen, wer online ist, beenden einzelne oder alle Sessions eines Nutzers, sperren Konten und prüfen den Anmeldeverlauf. Deine App erhält Logout-Routen, eine Liste der eigenen Geräte, eine Sperre nach Fehlversuchen und optionale Länderregeln.

- Paket: `strapi-plugin-magic-sessionmanager` 4.14.2 (veröffentlicht 2026-11-18)
- Installation: `npm install strapi-plugin-magic-sessionmanager`
- Strapi: ^5.50.0; Node.js: ^22.22.2 || >=24.15.0
- Lizenz: MIT, kostenlos
- Dokumentation: https://schero94.github.io/Magic-Sessionmanager/
- Quellcode auf GitHub: https://github.com/Schero94/Magic-Sessionmanager
- npm: https://www.npmjs.com/package/strapi-plugin-magic-sessionmanager
- Übersichtsseite: https://schero94.github.io/de/plugins/magic-sessionmanager/
- Stand: 2026-11-19

## Was es kann

- Ein Session-Dashboard mit Zählern für Aktiv, Inaktiv und Beendet, Suche, Filtern, CSV- und JSON-Export und einem Detaildialog pro Session.
- Eine Session oder alle Sessions eines Nutzers beenden oder den Nutzer sperren. Eine beendete Session wird beim nächsten Request mit 401 abgelehnt.
- Content-API-Routen für meine Sessions, die aktuelle Session, Logout, Logout überall und Logout auf anderen Geräten.
- Temporäre IP-Sperre nach Fehlversuchen, Rate Limits, optionale Ablehnung von VPN-, Proxy- oder schlecht bewerteten Anmeldungen und Länder-Allow- oder Blocklisten.
- IP-Standort aus einer lokalen MaxMind-GeoLite2-Datenbank, über ipapi.co oder abgeschaltet.
- Funktioniert mit jwtManagement: 'refresh' (Strapis eigene Sessions und Refresh Tokens) und mit 'legacy-support'.

## Passt, wenn

Du willst die Sessions der Nutzer deiner App sehen und beenden oder Passwort-Raten stoppen, bevor es sie erreicht.

## Nicht gedacht für

Es verwaltet keine Sessions von Strapi-Administratoren.

## Was es braucht

Strapi 5 mit Users & Permissions. Das Homepage-Widget braucht Strapi 5.13 oder neuer. In Produktion braucht es einen festen Schlüssel für die Token-Verschlüsselung.

## Fragen

### Verwaltet es Strapi-Admin-Konten?

Nein. Es verwaltet Endnutzer von Users & Permissions. Sessions von Strapi-Administratoren gehören nicht dazu.

### Funktioniert es mit jwtManagement: 'refresh'?

Ja. Strapi erstellt, rotiert und widerruft seine eigenen Sessions; das Plugin ergänzt Gerät, IP-Adresse, Standort und Verlauf und beendet die native Session, wenn du sie im Admin beendest.

### Läuft es auf Railway mit mehreren Replicas oder mit pm2 im Cluster-Modus?

Ja, mit PostgreSQL oder MySQL, die alle Prozesse teilen. Sticky Sessions oder Redis sind nicht nötig.

### Sendet es IP-Adressen meiner Nutzer irgendwohin?

Nur wenn die Standortabfrage ipapi.co nutzt. Mit einer lokalen MaxMind-Datenbank oder abgeschalteter Abfrage bleiben IP-Adressen auf deinem Server.

Diese Seite ist ein kurzer Überblick. Einrichtung, Konfiguration und Referenz stehen auf der Dokumentationsseite. https://schero94.github.io/Magic-Sessionmanager/
