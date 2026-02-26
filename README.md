# GCP Solution Showcase

A stunning portfolio application designed to showcase AI-powered cloud solutions and modern web applications built on Google Cloud Platform (GCP). It features a sleek, responsive user interface inspired by Google's Material Design, presenting demos in an interactive grid with detailed views.

## Features

- **Demo Showcase:** View a collection of cloud run demos and solutions, tech stacks, and descriptions.
- **Admin Dashboard:** A built-in administration panel at `/admin` to add, edit, delete, and reorder showcased demos.
- **Responsive Design:** A premium, modern web interface with subtle micro-animations 
- **No-SQL Storage:** Leverages Google Cloud Firestore for persistent storage of demo metadata.

## Tech Stack

**Frontend:**
- [React](https://react.dev/) 

**Backend:**
- [FastAPI](https://fastapi.tiangolo.com/) (Python)
- Google Cloud Firestore (`google-cloud-firestore`)

## Prerequisites

- Node.js (v18 or newer recommended)
- Python 3.9+
- Google Cloud CLI (`gcloud`)

## Setup & Installation

### 1. GCP Authentication

Ensure your local environment is authenticated with Google Cloud to allow the backend to access Firestore:
```bash
gcloud auth application-default login
```

### 2. Frontend Setup

Navigate to the `frontend` directory and install the Node.js dependencies:
```bash
cd frontend
npm install
```

Start the frontend development server:
```bash
cd frontend
npm run dev
```

### 3. Backend Setup

Navigate to the `backend` directory, set up a virtual environment, and install the Python dependencies:
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

Run the FastAPI backend:
```bash
fastapi dev main.py
```

## Deployment

The application is structured to be containerized and deployed to **Google Cloud Run**. The FastAPI backend is configured to serve the built React static files (`dist/`) in a production environment.

1. Build the frontend:
```bash
cd frontend
npm run build
```
2. Build the Docker container (requires Dockerfile) and deploy via GCP Cloud Build / Cloud Run.
