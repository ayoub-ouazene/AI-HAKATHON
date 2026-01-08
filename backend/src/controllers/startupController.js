// controllers/startupController.js
const prisma = require("../config/prisma"); // <--- CHANGED

exports.updateProfile = async (req, res) => {
  try {
    const startupId = parseInt(req.user.id);
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
    const startupId = parseInt(req.user.id);
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
      where: { id: parseInt(req.user.id) },
      include: {
        financials: { orderBy: { month: 'asc' } },
        fundingRequests: {
          include: {
            waitingList: {
              include: {
                investor: {
                  select: {
                    id: true,
                    fullName: true,
                  }
                }
              }
            }
          }
        }
      }
    });



    res.json(startup);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.respondToOffer = async (req, res) => {
  try {
    const { offerId, status } = req.body; // status: 'ACCEPTED' | 'REJECTED'

    if (!['ACCEPTED', 'REJECTED'].includes(status)) {
      return res.status(400).json({ error: "Invalid status. Use ACCEPTED or REJECTED." });
    }

    const offer = await prisma.investmentOffer.update({
      where: { id: parseInt(offerId) },
      data: { status: status }
    });

    res.json({ message: `Offer ${status.toLowerCase()} successfully`, offer });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};