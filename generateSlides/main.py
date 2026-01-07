from fastapi import FastAPI, UploadFile
import tempfile
import uuid

from pdf_utils import extract_pdf_text
from prompt import build_slides_prompt
from llm import generate_slides_json

app = FastAPI(title="Startup Slide Generator")

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
