from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse, JSONResponse
from pydantic import BaseModel
from typing import List, Optional
from google.cloud import firestore
import os

app = FastAPI()

# Enable CORS for the frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # For demo purposes, allow all. In prod, specify the React app URL.
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Firestore
# Note: Ensure you have `gcloud auth application-default login` run locally
db = firestore.Client(project="gen-ai-4all", database="appshowcase-db")
collection_name = "demos"

class Demo(BaseModel):
    id: str
    title: str
    description: str
    longDescription: str
    techStack: List[str]
    thumbnail: str
    url: str
    techDetails: str

class DemoUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    longDescription: Optional[str] = None
    techStack: Optional[List[str]] = None
    thumbnail: Optional[str] = None
    url: Optional[str] = None
    techDetails: Optional[str] = None

@app.get("/demos", response_model=List[Demo])
async def get_demos():
    try:
        demos_ref = db.collection(collection_name)
        docs = demos_ref.stream()
        demos = []
        for doc in docs:
            demo_data = doc.to_dict()
            demos.append(Demo(**demo_data))
        return demos
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch demos: {str(e)}")

@app.post("/demos", response_model=Demo)
async def create_demo(demo: Demo):
    try:
        doc_ref = db.collection(collection_name).document(demo.id)
        if doc_ref.get().exists:
            raise HTTPException(status_code=400, detail="Demo with this ID already exists.")
        
        doc_ref.set(demo.dict())
        return demo
    except HTTPException as he:
        raise he
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to create demo: {str(e)}")

@app.put("/demos/{demo_id}", response_model=Demo)
async def update_demo(demo_id: str, demo_update: DemoUpdate):
    try:
        doc_ref = db.collection(collection_name).document(demo_id)
        if not doc_ref.get().exists:
            raise HTTPException(status_code=404, detail="Demo not found.")
        
        update_data = {k: v for k, v in demo_update.dict().items() if v is not None}
        if not update_data:
            raise HTTPException(status_code=400, detail="No fields provided for update.")

        doc_ref.update(update_data)
        
        # Return updated document
        updated_doc = doc_ref.get()
        return Demo(**updated_doc.to_dict())
    except HTTPException as he:
        raise he
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to update demo: {str(e)}")

@app.delete("/demos/{demo_id}")
async def delete_demo(demo_id: str):
    try:
        doc_ref = db.collection(collection_name).document(demo_id)
        if not doc_ref.get().exists:
            raise HTTPException(status_code=404, detail="Demo not found.")
        
        doc_ref.delete()
        return {"message": "Demo deleted successfully"}
    except HTTPException as he:
        raise he
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to delete demo: {str(e)}")

# Serve Static React App
# Cloud Run will run from /app, and copy the React build to /app/dist
static_dir = os.path.join(os.path.dirname(__file__), "dist")
if os.path.exists(static_dir):
    app.mount("/", StaticFiles(directory=static_dir, html=True), name="static")

@app.exception_handler(404)
async def custom_404_handler(request, __):
    if request.url.path.startswith("/demos") or request.url.path.startswith("/assets"):
        return JSONResponse({"detail": "Not Found"}, status_code=404)
    if os.path.exists(os.path.join(static_dir, "index.html")):
        return FileResponse(os.path.join(static_dir, "index.html"))
    return JSONResponse({"detail": "Not Found"}, status_code=404)
