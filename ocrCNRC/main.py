from fastapi import FastAPI, UploadFile, File
import shutil
import os

from services.cnrc_verifier.service import verify_cnrc

app = FastAPI(title="Startup Verification API")

UPLOAD_DIR = "data/uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)


@app.post("/verify-cnrc")
async def verify_cnrc_endpoint(file: UploadFile = File(...)):
    file_path = f"{UPLOAD_DIR}/{file.filename}"

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    result = verify_cnrc(file_path)

    return result
