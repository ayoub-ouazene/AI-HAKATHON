import easyocr

reader = easyocr.Reader(['en', 'ar'], gpu=False)

def extract_cnrc_text(image_path: str) -> str:
    results = reader.readtext(image_path, detail=0)
    return " ".join(results)
