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



    res.json(startup);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};