// controllers/dealController.js
const prisma = require("../config/prisma"); // <--- CHANGED

exports.createPost = async (req, res) => {
  try {
    const startupId = req.user.id;
    const { amountRequested, equityOffered, offerType } = req.body;

    // FROM AI ENDPOINT
    const riskScore = Math.floor(Math.random() * 30) + 10;
    // fetch

//     const getStartupRiskScore = async (data) => {
//     try {
//         const response = await fetch('http://127.0.0.1:8000/predict', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 experience: data.experienceYears,
//                 founders: data.numFounders,
//                 tech_founder: data.hasTechnicalFounder,
//                 users: data.monthlyUsers
//             }),
//         });

//         if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         const result = await response.json();
//         return result; // returns { risk_score: 72, category: "Medium" }
        
//     } catch (error) {
//         console.error("AI Service unreachable or Error:", error.message);
//         return { risk_score: 0, category: "Pending" };
//     }
// }; 


    const post = await prisma.fundingRequest.create({
      data: {
        startupId,
        amountRequested: parseFloat(amountRequested),
        equityOffered: parseFloat(equityOffered),
        offerType,
        riskScore
      }
    });
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllDeals = async (req, res) => {
  try {
    const deals = await prisma.fundingRequest.findMany({
      where: { isActive: true },
      include: { 
        startup: {
            select: { companyName: true, logoUrl: true, description: true } 
        } 
      }
    });
    res.json(deals);
  } catch (err) {
    res.status(500).json({ error: err.message });
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