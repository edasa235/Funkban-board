# Database

Funkban bruker PostgreSQL som database og Drizzle ORM
for kommunikasjon mellom applikasjonen og databasen.

## Database structure

- Boards
- Columns
- Tasks
- Labels
- Task labels

## Database flow

Next.js API → Services → Drizzle ORM → PostgreSQL

## Migrations

Databaseendringer håndteres gjennom SQL-migreringer i
`src/DB/migrations/`.

## Seed

Testdata kan legges inn med:

```bash
npm run seed:docker