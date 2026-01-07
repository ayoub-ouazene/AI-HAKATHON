from .ocr import extract_cnrc_text
from .prompt import build_cnrc_prompt

def mock_llm_call(prompt: str) -> dict:
    return {
        "company_name": "TechNova SARL",
        "registration_number": "16/00-123456B19",
        "legal_form": "SARL",
        "status": "Active",
        "creation_date": "2022-06-14"
    }

def verify_cnrc(image_path: str) -> dict:
    ocr_text = extract_cnrc_text(image_path)
    prompt = build_cnrc_prompt(ocr_text)

    cnrc_data = mock_llm_call(prompt)

    return {
        "verified": cnrc_data["status"] == "Active",
        "cnrc_data": cnrc_data,
        "confidence_score": 0.9
    }
