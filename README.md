# Funkban

Funkban er en prototype på en Kanban-tavle utviklet for å organisere oppgaver visuelt ved hjelp av boards, columns, tasks og labels.

Prosjektet er laget som en prototype og har ikke brukerinnlogging eller brukerkontoer.

## 1. Hovedfunksjoner

Funkban støtter følgende funksjoner:

- Opprette, redigere og slette boards
- Opprette, redigere og slette columns
- Opprette, redigere og slette tasks
- Flytte tasks mellom columns
- Opprette, redigere og slette labels
- Tilordne labels til tasks
- Fjerne labels fra tasks

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
- PostgreSQL 18.3
- Drizzle ORM

### Dokumentasjon og API
- Swagger UI
- OpenAPI

### Utviklingsmiljø
- Docker
- Docker Compose

## 3. Hvordan kjøre prosjektet

Funkban er satt opp til å kjøres med Docker. Lokal kjøring uten Docker er ikke testet.

Start prosjektet med:

```bash
docker compose up --build
