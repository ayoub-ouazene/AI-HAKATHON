import fitz  # This is PyMuPDF


def extract_cnrc_text(pdf_path: str) -> str:
    # Open the PDF file
    doc = fitz.open(pdf_path)
    full_text = []


    for page in doc:
        # Get text from each page
        text = page.get_text()
        full_text.append(text)

    # Close the document
    doc.close()
    
    # Return as a single string for your LLM prompt
    return " ".join(full_text)