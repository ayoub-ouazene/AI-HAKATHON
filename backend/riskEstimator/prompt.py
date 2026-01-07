def build_risk_prompt(startup: dict) -> str:
    return f"""
You are a venture capital risk analyst.

You are given structured information about a startup.

Startup data:
- Sector: {startup["sector"]}
- Number of founders: {startup["numFounders"]}
- Has technical founder: {startup["hasTechnicalFounder"]}
- Founders experience (years): {startup["experienceYears"]}
- Monthly active users: {startup["monthlyUsers"]}

Evaluate the following risk dimensions:
1. Team risk
2. Market risk
3. Product risk
4. Execution risk

Rules:
- Use ONLY the given data
- Do NOT invent information
- Be critical and realistic

Return JSON ONLY in this format:

{{
  "risk_score": 0-100,
  "risk_level": "Low / Medium / High",
  "main_risks": ["risk 1", "risk 2"],
  "positive_signals": ["signal 1", "signal 2"]
}}
"""
