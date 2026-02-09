#!/usr/bin/env bash
set -euo pipefail

# clean-db.sh
# Backup and then truncate all tables in the public schema of the PostgreSQL database
# running in the 'taskora' namespace. Keeps schema but removes all rows and resets
# sequences. Use with caution.

NAMESPACE=${1:-taskora}
SECRET_NAME=${2:-database-secret}
SERVICE_NAME=${3:-database}
LOCAL_PG_PORT=5432
BACKUP_FILE="taskora_backup_$(date +%F_%H%M%S).dump"

function die { echo "$@" >&2; exit 1; }

echo "Namespace: $NAMESPACE"

# Read DB creds from secret (base64) and decode
DB_USER=$(kubectl get secret -n "$NAMESPACE" "$SECRET_NAME" -o jsonpath='{.data.username}' 2>/dev/null || true)
DB_PASS=$(kubectl get secret -n "$NAMESPACE" "$SECRET_NAME" -o jsonpath='{.data.password}' 2>/dev/null || true)

if [[ -z "$DB_USER" || -z "$DB_PASS" ]]; then
  echo "Could not read credentials from secret '$SECRET_NAME' in namespace '$NAMESPACE'."
  echo "Please provide DB user and password interactively.";
  read -rp "DB user: " DB_USER
  read -rsp "DB password: " DB_PASS
  echo
else
  DB_USER=$(echo "$DB_USER" | base64 --decode)
  DB_PASS=$(echo "$DB_PASS" | base64 --decode)
fi

# Default DB name: try postgres, then user
DB_NAME=${4:-postgres}

echo "Detected DB user: $DB_USER"
echo "Using DB name: $DB_NAME (override with 4th arg)"

read -rp "This will BACKUP and then TRUNCATE ALL TABLES in schema 'public'. Continue? [y/N] " CONFIRM
if [[ "$CONFIRM" != "y" && "$CONFIRM" != "Y" ]]; then
  echo "Aborting."; exit 0
fi

# 1) Port-forward database service locally for pg_dump
echo "Starting port-forward to service/$SERVICE_NAME:$LOCAL_PG_PORT (ctrl-C will stop)"
kubectl port-forward -n "$NAMESPACE" svc/$SERVICE_NAME $LOCAL_PG_PORT:5432 >/dev/null 2>&1 &
PF_PID=$!
# give it a moment
sleep 1

# Ensure we always kill port-forward on exit
trap 'kill $PF_PID 2>/dev/null || true' EXIT

# 2) Backup with pg_dump (custom format)
export PGPASSWORD="$DB_PASS"
if command -v pg_dump >/dev/null 2>&1; then
  echo "Running pg_dump to $BACKUP_FILE ..."
  pg_dump -h localhost -p $LOCAL_PG_PORT -U "$DB_USER" -d "$DB_NAME" -F c -b -v -f "$BACKUP_FILE"
  echo "Backup saved to $BACKUP_FILE"
else
  echo "pg_dump not found locally. Attempting to run pg_dump in a database pod..."
  POD=$(kubectl get pods -n "$NAMESPACE" -o name | grep database | head -n1 | cut -d/ -f2 || true)
  if [[ -z "$POD" ]]; then
    die "No pod with 'database' in the name found in namespace $NAMESPACE. Install pg_dump locally or run backup manually."
  fi
  kubectl exec -n "$NAMESPACE" "$POD" -- pg_dump -U "$DB_USER" -d "$DB_NAME" -F c -b -v -f /tmp/$BACKUP_FILE
  kubectl cp "$NAMESPACE/$POD:/tmp/$BACKUP_FILE" "$BACKUP_FILE"
  kubectl exec -n "$NAMESPACE" "$POD" -- rm /tmp/$BACKUP_FILE
  echo "Backup copied to $BACKUP_FILE"
fi

# 3) Truncate all tables in public schema and restart identities
# We'll run a DO block that truncates all user tables
POD=$(kubectl get pods -n "$NAMESPACE" -o name | grep database | head -n1 | cut -d/ -f2 || true)
if [[ -z "$POD" ]]; then
  die "Could not find a database pod in namespace $NAMESPACE to run truncation."
fi

echo "Executing truncation SQL on pod $POD (using heredoc to avoid quoting issues)"

kubectl exec -n "$NAMESPACE" -i "$POD" -- psql -U "$DB_USER" -d "$DB_NAME" <<'PSQL'
DO $$ DECLARE r RECORD; BEGIN
  FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = 'public') LOOP
    EXECUTE 'TRUNCATE TABLE public.' || quote_ident(r.tablename) || ' RESTART IDENTITY CASCADE';
  END LOOP;
END $$;
PSQL

echo "Truncation complete. All tables in public schema are empty and sequences reset."

echo "Done. Backup: $BACKUP_FILE"

# Cleanup: port-forward trap will kill the background process
exit 0
