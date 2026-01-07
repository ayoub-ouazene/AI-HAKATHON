import os
import json
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

def generate_slides_json(prompt: str) -> dict:
    # We use Llama 3.3 70B which is smart and fast
    completion = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "system", 
                "content": "You are a professional presentation architect. You must respond ONLY with valid JSON."
            },
            {
                "role": "user", 
                "content": prompt
            }
        ],
        # Forces the model to output a valid JSON object
        response_format={"type": "json_object"},
        temperature=0.5
    )
    
    return json.loads(completion.choices[0].message.content)