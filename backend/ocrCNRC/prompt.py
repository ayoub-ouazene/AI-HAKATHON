def build_cnrc_prompt(ocr_text: str) -> str:
    return f"""
You are a legal document verification assistant.

The following text was extracted using OCR from an Algerian
Commercial Register (CNRC) document.

Your task:
- Extract the following fields if explicitly present
- Do NOT guess or invent information
- If information is missing, say "Not specified"

Fields:
1. Company Name
2. Registration Number
3. Legal Form
4. Company Status
5. Creation Date

Return JSON ONLY in this format:

{{
  "company_name": "string or Not specified",
  "registration_number": "string or Not specified",
  "legal_form": "string or Not specified",
  "status": "Active / Inactive / Not specified",
  "creation_date": "string or Not specified"
}}

OCR text:
\"\"\"
{ocr_text}
\"\"\"
"""
