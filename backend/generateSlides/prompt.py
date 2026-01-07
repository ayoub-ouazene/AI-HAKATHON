def build_slides_prompt(pdf_text: str) -> str:
    return f"""
You are an expert Venture Capital Analyst. Your task is to perform a factual extraction from a startup's submission.

The startup was instructed to provide:
1. Problem
2. Solution
3. Product Description
4. Target Market
5. Business Model

### CONSTRAINTS:
- SOURCE TRUTH: Use ONLY information explicitly present in the provided text.
- NO HALLUCINATION: Do NOT invent statistics, market sizes, or features. 
- HANDLING MISSING DATA: If a section is missing, incomplete, or contains only marketing fluff without substance, the first bullet point MUST be "Not clearly specified."
- QUANTITY: Exactly 1 slide per section (5 slides total). Each slide MUST have 3 to 5 bullet points.
- TONE: Professional, objective, and data-driven. Remove adjectives like "amazing," "incredible," or "unique."

### OUTPUT FORMAT:
Return ONLY a JSON object. No preamble, no markdown blocks, no closing remarks.

{{
  "slides": [
    {{
      "title": "Problem",
      "bullets": ["Point 1", "Point 2", "Point 3"]
    }},
    {{
      "title": "Solution",
      "bullets": ["Point 1", "Point 2", "Point 3"]
    }},
    {{
      "title": "Product Description",
      "bullets": ["Point 1", "Point 2", "Point 3"]
    }},
    {{
      "title": "Target Market",
      "bullets": ["Point 1", "Point 2", "Point 3"]
    }},
    {{
      "title": "Business Model",
      "bullets": ["Point 1", "Point 2", "Point 3"]
    }}
  ]
}}

### STARTUP DOCUMENT:
\"\"\"
{pdf_text}

\"\"\"
"""