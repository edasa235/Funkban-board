# Funkban

Funkban er en prototype på en Kanban-tavle utviklet for å organisere oppgaver visuelt ved hjelp av boards, columns, tasks og labels.

Prosjektet er laget som en prototype og har ikke brukerinnlogging eller brukerkontoer.

## 1. Hovedfunksjoner

Funkban støtter følgende funksjoner:

* Opprette, redigere og slette boards
* Opprette, redigere og slette columns
* Opprette, redigere og slette tasks
* Flytte tasks mellom columns
* Opprette, redigere og slette labels
* Tilordne labels til tasks
* Fjerne labels fra tasks

Andre funksjoner er ikke utviklet ennå.

## 2. Teknologistakk

### Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS

### Backend

* Next.js API Routes
* TypeScript

### Database

* PostgreSQL 18.3
* Drizzle ORM

### Dokumentasjon og API

* Swagger UI
* OpenAPI

### Utviklingsmiljø

* Docker
* Docker Compose

## 3. Hvordan kjøre prosjektet

Funkban er satt opp til å kjøres med Docker. Lokal kjøring uten Docker er ikke testet.

Start prosjektet med:

```bash
docker compose up --build
```

Applikasjonen er tilgjengelig på:

```text
http://localhost:3000
```

Swagger er tilgjengelig på:

```text
http://localhost:8080
```

### Seed databasen

For å legge inn testdata i databasen:

```bash
npm run seed:docker
```

### Stoppe prosjektet

```bash
docker compose down
```

## 4. Database

PostgreSQL kjøres som en del av Docker Compose-oppsettet.

Database-migreringer kjøres automatisk når prosjektet startes.

Seed-scriptet brukes for å fylle databasen med testdata.

Mer detaljert informasjon om database og systemarkitektur beskrives i systemdokumentasjonen.

## 5. API

Funkban har et REST API som brukes av frontend-applikasjonen for å kommunisere med databasen.

API-et kan testes gjennom Swagger:

```text
http://localhost:8080
```

Detaljert dokumentasjon av API-endepunktene finnes i OpenAPI-dokumentasjonen.

## 6. Status

Funkban er fortsatt under utvikling og er ment som en prototype. Flere funksjoner og forbedringer kan bli lagt til senere.
