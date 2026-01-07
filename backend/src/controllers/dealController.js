// controllers/dealController.js
const prisma = require("../config/prisma"); // <--- CHANGED

exports.createPost = async (req, res) => {
  try {
    const startupId = req.user.id;
    const { amountRequested, equityOffered, offerType } = req.body;

    // FROM AI ENDPOINT
    const riskScore = Math.floor(Math.random() * 30) + 10; 

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