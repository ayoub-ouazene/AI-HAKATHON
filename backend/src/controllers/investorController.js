const prisma = require("../config/prisma");

// 1. Update Investor Profile
exports.updateProfile = async (req, res) => {
  try {
    const investorId = req.user.id;
    // We only take fields that exist in your Schema
    const { biography, sectors } = req.body; 

    // Note: We upload the file to Cloudinary, but we CANNOT save the URL 
    // to the database because your schema lacks an 'avatarUrl' column.
    // const avatarUrl = req.files?.['avatar']?.[0]?.path;

    // Handle sectors: If Postman sends "Fintech, AI", convert to ["Fintech", "AI"]
    let sectorsArray = sectors;
    if (typeof sectors === 'string') {
      sectorsArray = sectors.split(',').map(s => s.trim());
    }

    const updatedInvestor = await prisma.investor.update({
      where: { id: investorId },
      data: {
        biography: biography, 
        sectors: sectorsArray,
      },
      select: {
        id: true,
        fullName: true,
        email: true,
        biography: true,
        sectors: true
      }
    });

    res.json(updatedInvestor);
  } catch (err) {
    console.error("PROFILE ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};

// 2. Create an Opportunity (Reverse Market)
exports.createOpportunity = async (req, res) => {
  try {
    const investorId = req.user.id;
    const { title, description, budget } = req.body;

    const opportunity = await prisma.opportunity.create({
      data: {
        title,
        description,
        budget: budget ? parseFloat(budget) : null,
        investor: {
          connect: { id: investorId }
        }
      }
    });

    res.status(201).json(opportunity);
  } catch (err) {
    console.error("OPPORTUNITY ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};

// 3. Get Investor Portfolio (History of offers made)
exports.getMyPortfolio = async (req, res) => {
  try {
    const investorId = req.user.id;

    const offers = await prisma.investmentOffer.findMany({
      where: { investorId: investorId },
      include: {
        fundingRequest: {
          include: {
            startup: {
              select: { 
                companyName: true, 
                logoUrl: true 
              }
            }
          }
        }
      }
    });

    res.json(offers);
  } catch (err) {
    console.error("PORTFOLIO ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};