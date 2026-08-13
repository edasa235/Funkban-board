# Funkban

Funkban er en prototype på en Kanban-tavle utviklet for å organisere oppgaver
visuelt ved hjelp av boards, columns, tasks og labels.

Prosjektet er laget som en prototype og har ikke brukerinnlogging,
brukerkontoer eller tilgangsstyring.

## 1. Hovedfunksjoner

Funkban støtter følgende funksjoner:

- Opprette, redigere og slette boards.
- Opprette, redigere og slette columns.
- Opprette, redigere og slette tasks.
- Flytte tasks mellom columns.
- Opprette, redigere og slette labels.
- Tilordne labels til tasks.
- Fjerne labels fra tasks.

Andre funksjoner er ikke utviklet ennå.

## 2. Teknologistakk

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS

### Backend

- Next.js API Routes
- TypeScript

### Database

- PostgreSQL
- Drizzle ORM

### Dokumentasjon og API

- Swagger UI
- OpenAPI

### Utviklingsmiljø

- Docker
- Docker Compose

## 3. Hvordan kjøre prosjektet

Funkban er satt opp til å kjøres med Docker.
Lokal kjøring uten Docker er ikke testet.

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

Databaseendringer håndteres gjennom migreringer i prosjektet.

Seed-scriptet brukes for å fylle databasen med testdata.

Mer detaljert informasjon om databasen og systemarkitekturen finnes i
systemdokumentasjonen.

## 5. API

Funkban har et REST API som brukes av frontend-applikasjonen for å
kommunisere med databasen.

API-rutene ligger i:

```text
src/app/api/
```

API-et kan testes gjennom Swagger:

```text
http://localhost:8080
```

Detaljert dokumentasjon av API-endepunktene finnes i OpenAPI-dokumentasjonen.

## 6. Testing

Kjør tester med:

```bash
npm test
```

Kjør linting med:

```bash
npm run lint
```

Lag en produksjonsbuild med:

```bash
npm run build
```

## 7. Status

Funkban er en prototype. Flere funksjoner, som brukerinnlogging,
tilgangsstyring og forbedret testdekning, kan utvikles senere.
