# Build stage
FROM node:20-slim AS build

WORKDIR /app
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ .
RUN npm run build

# Production stage
FROM python:3.11-slim

# Install uv
COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/

WORKDIR /app

# Copy python dependencies and install via uv
COPY backend/requirements.txt .
RUN uv pip install --system --no-cache -r requirements.txt

# Copy FastAPI backend code
COPY backend/main.py /app/main.py

# Copy React build from Node stage into FastAPI static directory
COPY --from=build /app/dist /app/dist

# Expose the Cloud Run default port
EXPOSE 8080

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8080"]
