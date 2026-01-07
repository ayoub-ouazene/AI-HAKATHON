from fastapi import FastAPI
from riskEstimator.service import estimate_risk

app = FastAPI(title="Startup Risk Estimator API")


@app.post("/estimate-risk")
async def estimate_risk_endpoint(startup: dict):
    """
    Expected input:
    {
      "sector": "energy",
      "numFounders": 6,
      "hasTechnicalFounder": false,
      "experienceYears": 33,
      "monthlyUsers": 773
    }
    """
    return estimate_risk(startup)






from fastapi import FastAPI, UploadFile, File
import shutil
import os

from ocrCNRC.service import verify_cnrc

# app = FastAPI(title="Startup Verification API")

UPLOAD_DIR = "data/uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)


@app.post("/verify-cnrc")
async def verify_cnrc_endpoint(file: UploadFile = File(...)):
    file_path = f"{UPLOAD_DIR}/{file.filename}"

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    result = verify_cnrc(file_path)

    return result








from fastapi import FastAPI, UploadFile
import tempfile
import uuid

from generateSlides.pdf_utils import extract_pdf_text
from generateSlides.prompt import build_slides_prompt
from generateSlides.llm import generate_slides_json

# app = FastAPI(title="Startup Slide Generator")

# Hackathon in-memory store
SLIDES_DB = {}

@app.post("/generate-slides")
async def generate_slides(file: UploadFile):
    startup_id = str(uuid.uuid4())

    with tempfile.NamedTemporaryFile(delete=False) as tmp:
        tmp.write(await file.read())
        pdf_path = tmp.name

    pdf_text = extract_pdf_text(pdf_path)

    prompt = build_slides_prompt(pdf_text)
    slides_json = generate_slides_json(prompt)

    SLIDES_DB[startup_id] = slides_json

    return {
        "startup_id": startup_id,
        "slides": slides_json
    }
