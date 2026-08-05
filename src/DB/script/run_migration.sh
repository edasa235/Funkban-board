#!/bin/sh

echo "Running database migrations..."

export PGPASSWORD="$POSTGRES_PASSWORD"

for file in /migrations/migrations/*.sql
do
  echo "Executing $file"
  psql -h db -U "$POSTGRES_USER" -d "$POSTGRES_DB" -f "$file"
done

echo "Migrations completed!"