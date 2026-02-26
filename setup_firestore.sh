#!/bin/bash

# Exit on any error
set -e

# Default project
PROJECT_ID="gen-ai-4all"
DATABASE_ID="appshowcase-db"

echo "Setting working project to: $PROJECT_ID"
gcloud config set project "$PROJECT_ID"

echo "Enabling Firestore API..."
gcloud services enable firestore.googleapis.com

echo "Checking if database '$DATABASE_ID' already exists..."
if gcloud firestore databases describe --database="$DATABASE_ID" >/dev/null 2>&1; then
    echo "Database '$DATABASE_ID' already exists. Skipping creation."
else
    echo "Creating Firestore database '$DATABASE_ID' in Native Mode..."
    # You might need to adjust the location depending on your preferences
    gcloud firestore databases create --database="$DATABASE_ID" --location=us-central1 --type=firestore-native
    echo "Firestore database '$DATABASE_ID' created successfully."
fi

echo "Firestore setup complete!"
