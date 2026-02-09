#!/usr/bin/env bash
set -euo pipefail

# truncate-db-no-backup.sh
# DANGEROUS: truncates all tables in public schema of the DB and resets sequences.
# Development use only. No backups performed.

NAMESPACE=${1:-taskora}
POD=$(kubectl get pods -n "$NAMESPACE" -o name | grep database | head -n1 | cut -d/ -f2 || true)
DB_NAME=${2:-postgres}
SECRET_NAME=${3:-database-secret}

if [[ -z "$POD" ]]; then
  echo "No database pod found in namespace $NAMESPACE"; exit 1
fi

# Attempt to read DB user from secret
DB_USER=$(kubectl get secret -n "$NAMESPACE" "$SECRET_NAME" -o jsonpath='{.data.username}' 2>/dev/null || true)
if [[ -n "$DB_USER" ]]; then
  DB_USER=$(echo "$DB_USER" | base64 --decode)
else
  read -rp "DB user: " DB_USER
fi

read -rp "This will TRUNCATE ALL TABLES in schema 'public' on pod $POD (db=$DB_NAME). Continue? [y/N] " CONFIRM
if [[ "$CONFIRM" != "y" && "$CONFIRM" != "Y" ]]; then
  echo "Aborting."; exit 0
fi

SQL="DO $$ DECLARE r RECORD; BEGIN
  FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = 'public') LOOP
    EXECUTE 'TRUNCATE TABLE public.' || quote_ident(r.tablename) || ' RESTART IDENTITY CASCADE';
  END LOOP;
END $$;"

kubectl exec -n "$NAMESPACE" -i "$POD" -- psql -U "$DB_USER" -d "$DB_NAME" -c "$SQL"

echo "Truncation finished. All tables in public are empty."
