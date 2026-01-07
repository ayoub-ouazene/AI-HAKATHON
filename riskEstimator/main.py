from fastapi import FastAPI
from .service import estimate_risk

app = FastAPI(title="Startup Risk Estimator API")


@app.post("/estimate-risk")
async def estimate_risk_endpoint(startup: dict):
    """
    Expected input:
    {
      "sector": "energy",
      "numFounders": 6,
      "hasTechnicalFounder": false,
      "experienceYears": 33,
      "monthlyUsers": 773
    }
    """
    return estimate_risk(startup)
