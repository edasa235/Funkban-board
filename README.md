# Kanban Board Backend

## Om prosjektet

Dette prosjektet er en prototype av en backend for et Kanban-system. Backend-en er utviklet med **Next.js API** og **TypeScript**.

### Teknologier

* **Next.js** – API og backend
* **Drizzle ORM** – Kommunikasjon med databasen
* **Swagger UI** – Dokumentasjon og testing av API-et
* **Docker** – Containerisering av applikasjonen
* **[Database]** – Database for lagring av data

## Arkitektur

Applikasjonen fungerer slik:

```text
API → Drizzle ORM → Database
```

Swagger UI brukes til å dokumentere og teste API-endepunktene.

## Kjøre prosjektet

Prosjektet kan kjøres med Docker:

```bash
docker compose up --build
```

Alternativt kan det kjøres lokalt med:

```bash
npm install
npm run dev
```

## API-dokumentasjon

Swagger UI er tilgjengelig på:

```text
http://localhost:[PORT]/[SWAGGER-PATH]
```

Her kan API-endepunktene ses og testes.

## Docker

Docker brukes for å containerisere applikasjonen. Dette gjør det enklere å kjøre prosjektet med samme oppsett uavhengig av utviklingsmiljø.

## Formål

Formålet med prosjektet er å lage en fungerende backend-prototype og demonstrere bruk av API-er, databasekommunikasjon, dokumentasjon og containerisering.
