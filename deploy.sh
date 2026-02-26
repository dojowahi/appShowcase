#!/bin/bash

# Configuration
PROJECT_ID=$(gcloud config get-value project)
SERVICE_NAME="app-showcase"
REGION="us-central1"

echo "Deploying $SERVICE_NAME to project $PROJECT_ID in region $REGION..."

# Build and deploy to Cloud Run using Cloud Build
gcloud run deploy $SERVICE_NAME \
    --source . \
    --region $REGION \
    --allow-unauthenticated \
    --platform managed

echo "Deployment complete!"
