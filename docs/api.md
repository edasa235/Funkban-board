# API

API-et er implementert med Next.js API Routes.

API-rutene ligger i:

`src/app/api/`

Rutene håndterer HTTP-forespørsler og sender
databaseoperasjoner videre til service-laget.

## Structure

- `/api/boards`
- `/api/columns`
- `/api/tasks`
- `/api/labels`
## Swagger

Funkban bruker Swagger UI for å dokumentere og teste API-et.

Swagger-dokumentasjonen er basert på OpenAPI og ligger i:

`docs/openapi.yml`
## Architecture

Swagger / Frontend
↓
Next.js API Route
↓
Service
↓
Drizzle ORM
↓
PostgreSQL