#!/bin/bash

# Configuration
PROJECT_ID=$(gcloud config get-value project)
SERVICE_NAME="app-showcase"
REGION="us-central1"
SERVICE_ACCOUNT="genai-592@gen-ai-4all.iam.gserviceaccount.com"

echo "Deploying $SERVICE_NAME to project $PROJECT_ID in region $REGION..."
echo "Using service account: $SERVICE_ACCOUNT"

# Build and deploy to Cloud Run using Cloud Build
gcloud run deploy $SERVICE_NAME \
    --source . \
    --region $REGION \
    --allow-unauthenticated \
    --service-account $SERVICE_ACCOUNT \
    --impersonate-service-account $SERVICE_ACCOUNT

echo "Deployment complete!"
