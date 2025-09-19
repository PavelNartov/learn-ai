#!/bin/bash

# Exit immediately if a command exits with a non-zero status.
set -e

# Variables
# The script will receive the username and PAT from the GitHub Actions workflow
GHCR_USER=$1
GHCR_PAT=$2
IMAGE_NAME="ghcr.io/pavelnartov/learn-ai" # Using the lowercase name
CONTAINER_NAME="learn-ai-app"

# --- Script Body ---

echo "--- Logging in to GitHub Container Registry ---"
echo $GHCR_PAT | docker login ghcr.io -u $GHCR_USER --password-stdin

echo "--- Pulling the latest image ---"
docker pull ${IMAGE_NAME}:latest

echo "--- Stopping and removing old container (if it exists) ---"
docker stop $CONTAINER_NAME || true
docker rm $CONTAINER_NAME || true

echo "--- Starting new container ---"
docker run -d --rm -p 3000:3000 --name $CONTAINER_NAME ${IMAGE_NAME}:latest

echo "--- Deployment successful! ---"
