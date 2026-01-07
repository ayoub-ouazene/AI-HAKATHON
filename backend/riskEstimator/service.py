from .prompt import build_risk_prompt

def llm_call(prompt: str) -> dict:
    """
    Provider-agnostic LLM call.
    Replace this with OpenAI, HuggingFace, etc.
    """
    # DEMO RESPONSE (hackathon-safe)
    return {
        "risk_score": 68,
        "risk_level": "High",
        "main_risks": [
            "No technical founder despite large founding team",
            "User traction is low relative to founders' experience"
        ],
        "positive_signals": [
            "Large founding team",
            "High cumulative experience"
        ]
    }


def estimate_risk(startup_data: dict) -> dict:
    prompt = build_risk_prompt(startup_data)
    result = llm_call(prompt)
    return result
