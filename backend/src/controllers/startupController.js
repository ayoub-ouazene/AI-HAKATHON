// controllers/startupController.js
const prisma = require("../config/prisma"); // <--- CHANGED

exports.updateProfile = async (req, res) => {
  try {
    const startupId = req.user.id;
    const { description, phone, websiteUrl } = req.body;

    const logoUrl = req.files?.['logo']?.[0]?.path;
    const pitchDeckUrl = req.files?.['pitchDeck']?.[0]?.path;
    const cnrcUrl = req.files?.['cnrc']?.[0]?.path;

    const dataToUpdate = { description, phone, websiteUrl };
    if (logoUrl) dataToUpdate.logoUrl = logoUrl;
    if (pitchDeckUrl) dataToUpdate.pitchDeckUrl = pitchDeckUrl;
    if (cnrcUrl) dataToUpdate.cnrcUrl = cnrcUrl;

    const updatedStartup = await prisma.startup.update({
      where: { id: startupId },
      data: dataToUpdate
    });

    res.json(updatedStartup);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addFinancialRecord = async (req, res) => {
  try {
    const startupId = req.user.id;
    const { month, revenue, costs } = req.body;
    const proofUrl = req.files?.['proofDocument']?.[0]?.path;

    const record = await prisma.financialRecord.create({
      data: {
        startupId,
        month: new Date(month),
        revenue: parseFloat(revenue),
        costs: parseFloat(costs),
        proofDocumentUrl: proofUrl || null
      }
    });

    res.status(201).json(record);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getDashboard = async (req, res) => {
  try {
    const startup = await prisma.startup.findUnique({
      where: { id: req.user.id },
      include: {
        financials: { orderBy: { month: 'asc' } },
        fundingRequests: { include: { waitingList: true } }
      }
    });

    if (!startup) {
      return res.status(404).json({ error: "Startup not found" });
    }

    // 1. Filter the existing array to find "Active" offers
    // IMPORTANT: Replace 'OPEN' with the exact status string/enum from your Prisma schema (e.g., 'ACTIVE', 'PUBLISHED')
    const activeOffers = startup.fundingRequests.filter(
      (request) => request.status === 'OPEN'
    );

    // 2. Count them
    const activeOffersCount = activeOffers.length;

    // 3. Return the original startup object PLUS the new variables
    // We spread (...startup) to keep all original data (id, financials, etc.)
    res.json({
      ...startup,
      activeOffers,
      activeOffersCount
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};