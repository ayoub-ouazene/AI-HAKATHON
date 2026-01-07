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


//done
exports.getPortfolioDashboard = async (req, res) => {
  try {
    // CHECK 1: Is the middleware working?
    if (!req.user || !req.user.id) {
      throw new Error("User ID missing. Check 'protectInvestor' middleware.");
    }

    const investorId = req.user.id;

    const investor = await prisma.investor.findUnique({
      where: { id: investorId },
      select: { fullName: true }
    });

    if (!investor) return res.status(404).json({ error: "Investor not found" });

    const allOffers = await prisma.investmentOffer.findMany({
      where: { investorId: investorId },
      include: {
        fundingRequest: {
          include: {
            startup: {
              select: {
                companyName: true,
                logoUrl: true,
                description: true,
                sector: true
              }
            }
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    // 3. Separate Offers
    const acceptedOffers = allOffers.filter(o => o.status === 'ACCEPTED');
    const pendingOffers = allOffers.filter(o => o.status === 'PENDING' || o.status === 'COUNTER_OFFER');

    const totalDeployed = acceptedOffers.reduce((sum, offer) => {
      return sum + Number(offer.proposedAmount);
    }, 0);

    // ==========================================
    // SAFER MAPPING (Prevents Crashes)
    // ==========================================

    const mapSafeOffer = (offer, statusLabel) => {
      // SAFETY CHECK: If the deal or startup was deleted, skip this offer
      if (!offer.fundingRequest || !offer.fundingRequest.startup) {
        console.warn(`Skipping broken offer ID ${offer.id} - Deal/Startup missing`);
        return null;
      }

      const startup = offer.fundingRequest.startup;
      const equity = Number(offer.proposedEquity || 0);
      const amount = Number(offer.proposedAmount || 0);
      const valuation = equity > 0 ? (amount / (equity / 100)) : 0;

      const expDate = new Date(offer.createdAt);
      expDate.setDate(expDate.getDate() + 14);

      return {
        id: statusLabel === 'live' ? `deal_${offer.fundingRequestId}` : `offer_${offer.id}`,
        startup_name: startup.companyName,
        logo_text: startup.companyName ? startup.companyName.charAt(0).toUpperCase() : "?",
        logo_url: startup.logoUrl,
        one_liner: startup.description ? (startup.description.substring(0, 60) + "...") : "",
        status: statusLabel === 'live' ? 'live' : (offer.status === 'COUNTER_OFFER' ? 'negotiating' : 'pending'),
        // specific fields based on type
        ...(statusLabel === 'live'
          ? { invested_date: offer.updatedAt.toISOString().split('T')[0], my_stake_amount: amount, ownership_percentage: equity, current_valuation: valuation.toLocaleString() }
          : { offer_date: offer.createdAt.toISOString().split('T')[0], offer_amount: amount, equity_asked: equity, implied_valuation: valuation.toLocaleString(), expiration_date: expDate.toISOString().split('T')[0] }
        )
      };
    };

    // Filter(Boolean) removes the 'null' entries from the array
    const activeInvestmentsMapped = acceptedOffers.map(o => mapSafeOffer(o, 'live')).filter(Boolean);
    const pendingOffersMapped = pendingOffers.map(o => mapSafeOffer(o, 'pending')).filter(Boolean);

    const dashboardData = {
      investor_profile: {
        first_name: investor.fullName ? investor.fullName.split(' ')[0] : "Investor",
        total_deployed: totalDeployed
      },
      kpi_metrics: {
        pending_offers_count: pendingOffersMapped.length,
        active_deals_count: activeInvestmentsMapped.length
      },
      active_investments: activeInvestmentsMapped,
      pending_offers: pendingOffersMapped
    };

    res.status(200).json(dashboardData);

  } catch (err) {
    // LOG THE ACTUAL ERROR TO YOUR TERMINAL
    console.error("Dashboard Error Detailed:", err);
    res.status(500).json({ error: err.message }); // Send the specific error to Postman
  }
};

//done
exports.createInvestmentOffer = async (req, res) => {
  try {
    const investorId = parseInt(req.user.id); // From Auth Middleware

    // We get the deal ID and the terms from the body
    const { fundingRequestId, proposedAmount, proposedEquity } = req.body;

    // 0. SECURITY: Ensure user is an Investor
    if (req.user.role !== 'INVESTOR') {
      return res.status(403).json({ error: "Only Investors can make offers. Please log in as an Investor." });
    }

    // 1. Check if offer already exists (Prevent duplicate offers on same deal)
    const existingOffer = await prisma.investmentOffer.findUnique({
      where: {
        investorId_fundingRequestId: {
          investorId: investorId,
          fundingRequestId: parseInt(fundingRequestId)
        }
      }
    });

    if (existingOffer) {
      return res.status(400).json({ error: "You have already made an offer on this deal." });
    }

    // 2. Create the Offer
    const newOffer = await prisma.investmentOffer.create({
      data: {
        investorId: investorId,
        fundingRequestId: parseInt(fundingRequestId),
        proposedAmount: parseFloat(proposedAmount),
        proposedEquity: proposedEquity ? parseFloat(proposedEquity) : null,
        status: 'PENDING' // Default status
      }
    });

    res.status(201).json({
      message: "Offer sent successfully! You are now on the waiting list.",
      offer: newOffer
    });

  } catch (err) {
    console.error("Error creating offer:", err);
    res.status(500).json({ error: err.message });
  }
};