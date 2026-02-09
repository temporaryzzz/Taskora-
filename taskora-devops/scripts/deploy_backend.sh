#!/usr/bin/env bash
set -euo pipefail

echo "[1/3] Building Docker image for backend..."
cd "$HOME/Taskora-/taskora-backend"
docker build -t taskora-backend:latest .

echo "[2/3] Running helm upgrade for backend..."
cd "$HOME/Taskora-/taskora-devops/kubernetes/helm"
helm upgrade backend ./backend -n taskora

echo "[3/3] Restarting backend deployment..."
kubectl rollout restart deployment/backend -n taskora

echo "Backend deployed!"
