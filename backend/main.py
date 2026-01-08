import os
import shutil
import tempfile
import uuid
from fastapi import FastAPI, UploadFile, File, HTTPException

# --- Import your services ---
# Ensure these folders/files exist in your directory
from riskEstimator.service import estimate_risk
from ocrCNRC.service import verify_cnrc
from generateSlides.pdf_utils import extract_pdf_text
from generateSlides.prompt import build_slides_prompt
from generateSlides.llm import generate_slides_json

app = FastAPI(title="AI Startup Hackathon API")

# --- Storage Setup ---
UPLOAD_DIR = "data/uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)
SLIDES_DB = {} # In-memory store for the hackathon

# --- 1. Risk Estimation ---
@app.post("/estimate-risk")
async def estimate_risk_endpoint(startup: dict):
    """
    Input: { "sector": "string", "numFounders": int, ... }
    """
    try:
        return estimate_risk(startup)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Risk Estimation Error: {str(e)}")

# --- 2. CNRC Verification ---
@app.post("/verify-cnrc")
async def verify_cnrc_endpoint(file: UploadFile = File(...)):
    try:
        file_path = os.path.join(UPLOAD_DIR, file.filename)
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        result = verify_cnrc(file_path)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Verification Error: {str(e)}")

# --- 3. Slide Generation ---
@app.post("/generate-slides")
async def generate_slides(file: UploadFile = File(...)):
    try:
        # Create a temp file to store the uploaded PDF
        with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as tmp:
            content = await file.read()
            tmp.write(content)
            pdf_path = tmp.name

        # Process the PDF
        pdf_text = extract_pdf_text(pdf_path)
        prompt = build_slides_prompt(pdf_text)
        slides_json = generate_slides_json(prompt)

        # Cleanup the temp file after processing
        os.unlink(pdf_path)

        startup_id = str(uuid.uuid4())
        SLIDES_DB[startup_id] = slides_json

        return {
            "startup_id": startup_id,
            "slides": slides_json
        }
    except Exception as e:
        print(f"Slide Gen Error: {e}") # Log to terminal
        raise HTTPException(status_code=500, detail=f"Slide Gen Error: {str(e)}")

