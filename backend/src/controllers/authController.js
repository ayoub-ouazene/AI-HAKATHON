// controllers/authController.js
const prisma = require("../config/prisma"); // <--- CHANGED
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: '7d' });
};


exports.registerStartup = async (req, res) => {
  try {
    // 1. Extract text data from req.body
    const { 
      email, 
      password, 
      companyName, 
      founderName,
      description,
      sector,
      numFounders,
      hasTechnicalFounder,
      experienceYears,
      monthlyUsers,
      phone,
      websiteUrl,
      linkedinUrl
    } = req.body;

    // 2. Check if email exists
    const existing = await prisma.startup.findUnique({ where: { email } });
    if (existing) return res.status(400).json({ error: 'Email already exists' });

    // 3. Extract file paths from Cloudinary (Multer-Storage-Cloudinary)
    // Note: Use req.files for multiple fields
    const logoUrl = req.files?.['logo']?.[0]?.path || null;
    const pitchDeckUrl = req.files?.['pitchDeck']?.[0]?.path || null;
    const videoPitchUrl = req.files?.['videoPitch']?.[0]?.path || null;

    // 4. Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 5. Create Startup in Database
    const startup = await prisma.startup.create({
      data: {
        email,
        password: hashedPassword,
        companyName,
        founderName,
        phone,
        websiteUrl,
        linkedinUrl,
        logoUrl,
        // Metrics & Founder Data (Convert types)
        description: description || "New Startup Pitch",
        sector,
        numFounders: parseInt(numFounders) || 1,
        hasTechnicalFounder: hasTechnicalFounder === 'true' || hasTechnicalFounder === true,
        experienceYears: parseFloat(experienceYears) || 0.0,
        monthlyUsers: parseInt(monthlyUsers) || 0,
        // URLs
        pitchDeckUrl,
        videoPitchUrl
      }
    });

    // 6. Generate Token & Respond
    const token = generateToken(startup.id, 'STARTUP');
    
    // Safety: Remove password before sending user back
    const { password: _, ...userWithoutPassword } = startup;

    res.status(201).json({ 
      token, 
      user: { 
        ...userWithoutPassword,
        role: 'STARTUP' 
      } 
    });

  } catch (err) {
    console.error("REGISTRATION ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.registerInvestor = async (req, res) => {
  try {
    const { email, password, fullName } = req.body;
    const existing = await prisma.investor.findUnique({ where: { email } });
    if (existing) return res.status(400).json({ error: 'Email already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const investor = await prisma.investor.create({
      data: { email, password: hashedPassword, fullName }
    });

    const token = generateToken(investor.id, 'INVESTOR');
    res.status(201).json({ token, user: { id: investor.id, role: 'INVESTOR', name: fullName } });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await prisma.startup.findUnique({ where: { email } });
    let role = 'STARTUP';

    if (!user) {
      user = await prisma.investor.findUnique({ where: { email } });
      role = 'INVESTOR';
    }

    if (!user) return res.status(404).json({ error: 'User not found' });

    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) return res.status(400).json({ error: 'Invalid password' });

    const token = generateToken(user.id, role);
    res.json({ token, user: { id: user.id, role, email: user.email } });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};