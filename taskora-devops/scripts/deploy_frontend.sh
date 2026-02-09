#!/usr/bin/env bash
set -euo pipefail

eval $(minikube docker-env) 
echo "[1/3] Building Docker image for frontend..."
cd "$HOME/Taskora-/taskora-frontend"
docker build -t taskora-frontend:latest .

echo "[2/3] Running helm upgrade for frontend..."
cd "$HOME/Taskora-/taskora-devops/kubernetes/helm"
helm upgrade frontend ./frontend -n taskora

echo "[3/3] Restarting frontend deployment..."
kubectl rollout restart deployment/frontend -n taskora

echo "Frontend deployed!"
