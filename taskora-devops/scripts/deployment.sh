#!/bin/bash
set -euo pipefail

NAMESPACE="taskora"
DEPLOYMENTS=("backend" "frontend" "proxy")
STATEFULSETS=("database")

echo "🚀 Starting deployment to namespace: $NAMESPACE"

# 1. Проверяем namespace
if ! kubectl get namespace "$NAMESPACE" >/dev/null 2>&1; then
  echo "📦 Creating namespace $NAMESPACE"
  sudo kubectl create namespace "$NAMESPACE"
else
  echo "✅ Namespace $NAMESPACE exists"
fi

# 2. Apply secrets and configmaps
echo "🔑 Applying secrets and configMaps"
sudo kubectl apply -f k8s/secrets/ -n "$NAMESPACE"
sudo kubectl apply -f k8s/configmaps/ -n "$NAMESPACE"

# 3. Deploy StatefulSets (database)
for sts in "${STATEFULSETS[@]}"; do
  echo "🗄️ Deploying StatefulSet $sts"
  sudo  kubectl apply -f "k8s/$sts.yaml" -n "$NAMESPACE"
  echo "⏳ Waiting for $sts to be ready..."
  kubectl rollout status statefulset "$sts" -n "$NAMESPACE"
done

# 4. Deploy Deployments (backend, frontend, proxy)
for deploy in "${DEPLOYMENTS[@]}"; do
  echo "🚀 Deploying $deploy"
  sudo kubectl apply -f "k8s/$deploy.yaml" -n "$NAMESPACE"
  echo "⏳ Waiting for $deploy rollout..."
  kubectl rollout status deployment "$deploy" -n "$NAMESPACE"
done

echo "✅ Deployment finished!"
