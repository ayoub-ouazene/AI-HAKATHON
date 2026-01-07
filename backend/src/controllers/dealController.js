// controllers/dealController.js
const prisma = require("../config/prisma"); // <--- CHANGED



// Helper function to map score to your Prisma Enum
function mapScoreToEnum(score) {
  if (score < 30) return "LOW";
  if (score < 60) return "MEDIUM";
  if (score < 85) return "HIGH";
  return "EXTREME";
}

exports.createPost = async (req, res) => {
  try {
    const startupId = req.user.id;
    const { amountRequested, equityOffered, offerType } = req.body;

    // 1. FETCH TRUSTED METRICS FROM DB
    const startupData = await prisma.startup.findUnique({
      where: { id: startupId },
      select: {
        experienceYears: true,
        numFounders: true,
        hasTechnicalFounder: true,
        monthlyUsers: true,
        sector: true
      }
    });

    if (!startupData) {
      return res.status(404).json({ error: "Startup profile not found." });
    }

    // 2. CALL THE AI SERVICE
    let riskScore = 0;
    let riskLevel = "MEDIUM";

    try {
      const aiResponse = await fetch('http://127.0.0.1:8000/estimate-risk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sector: startupData.sector,
          experienceYears: startupData.experienceYears,
          numFounders: startupData.numFounders,
          hasTechnicalFounder: startupData.hasTechnicalFounder,
          monthlyUsers: startupData.monthlyUsers
        }),
      });

      if (aiResponse.ok) {
        const aiResult = await aiResponse.json();
        riskScore = aiResult.risk_score;
        riskLevel = mapScoreToEnum(riskScore);
      } else {
        console.warn("AI Service returned error status:", aiResponse.status);
        riskScore = 50;
        riskLevel = mapScoreToEnum(riskScore);
      }
    } catch (aiError) {
      console.error("AI Service is unreachable. Using default score.", aiError.message);
      riskScore = 50;
      riskLevel = mapScoreToEnum(riskScore);
    }

    // 3. CREATE THE FUNDING REQUEST (DEAL)
    const post = await prisma.fundingRequest.create({
      data: {
        startupId: startupId,
        amountRequested: parseFloat(amountRequested),
        equityOffered: equityOffered ? parseFloat(equityOffered) : null,
        offerType: offerType,
        riskScore: riskScore,
        riskLevel: riskLevel,
        isActive: true
      }
    });

    res.status(201).json({
      message: "Funding request created successfully",
      post
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

exports.getAllDeals = async (req, res) => {
  try {
    const deals = await prisma.fundingRequest.findMany({
      where: {
        isActive: true
      },
      include: {
        startup: true
      }
    });

    res.json(deals);
  } catch (err) {
    console.error("Error fetching deals:", err);
    res.status(500).json({ error: "Internal Server Error", details: err.message });
  }
};

exports.makeOffer = async (req, res) => {
  try {
    
    const investorId = parseInt(req.user.id);
    const { fundingRequestId, proposedAmount, proposedEquity } = req.body;

    // Validate inputs
    if (!fundingRequestId || isNaN(fundingRequestId)) {
      return res.status(400).json({ error: "Invalid Funding Request ID" });
    }
    
    const offer = await prisma.investmentOffer.upsert({
      where: {
        investorId_fundingRequestId: {
          investorId: investorId,
          fundingRequestId: parseInt(fundingRequestId)
        }
      },
      update: {
        proposedAmount: parseFloat(proposedAmount),
        proposedEquity: parseFloat(proposedEquity),
        status: 'COUNTER_OFFER'
      },
      create: {
        investorId,
        fundingRequestId: parseInt(fundingRequestId),
        proposedAmount: parseFloat(proposedAmount),
        proposedEquity: parseFloat(proposedEquity),
        status: 'PENDING'
      }
    });

    res.json(offer);
  } catch (err) {
    console.error("MAKE OFFER ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};














exports.getAllDeals = async (req, res) => {
  try {
    const deals = await prisma.fundingRequest.findMany({
      where: {
        isActive: true
      },
      include: {
        // Changing 'select' to 'true' fetches ALL columns from the Startup table
        startup: true
      }
    });

    // This now returns every field from FundingRequest 
    // PLUS every field from the associated Startup
    res.json(deals);
  } catch (err) {
    console.error("Error fetching deals:", err);
    res.status(500).json({ error: "Internal Server Error", details: err.message });
  }
};


exports.makeOffer = async (req, res) => {
  try {
    const investorId = req.user.id;
    const { fundingRequestId, proposedAmount, proposedEquity } = req.body;

    const offer = await prisma.investmentOffer.upsert({
      where: {
        investorId_fundingRequestId: {
          investorId: investorId,
          fundingRequestId: parseInt(fundingRequestId)
        }
      },
      update: {
        proposedAmount: parseFloat(proposedAmount),
        proposedEquity: parseFloat(proposedEquity),
        status: 'COUNTER_OFFER'
      },
      create: {
        investorId,
        fundingRequestId: parseInt(fundingRequestId),
        proposedAmount: parseFloat(proposedAmount),
        proposedEquity: parseFloat(proposedEquity),
        status: 'PENDING'
      }
    });

    res.json(offer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};