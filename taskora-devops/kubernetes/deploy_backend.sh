#!/bin/bash
set -e

NAMESPACE="taskora"
RELEASE="backend"
CHART_PATH="$HOME/Taskora/taskora-devops/kubernetes/helm/backend"

echo "🟢 Deploying/Updating backend..."

helm upgrade --install $RELEASE $CHART_PATH -n $NAMESPACE --wait --timeout 5m

# Ждем, пока новый pod станет Ready
# NEW_POD=$(kubectl get pods -n $NAMESPACE -l app.kubernetes.io/instance=$RELEASE -o jsonpath="{.items[0].metadata.name}")
# kubectl wait --for=condition=Ready pod/$NEW_POD -n $NAMESPACE --timeout=3m
#
# echo "✅ Backend is ready"
#
