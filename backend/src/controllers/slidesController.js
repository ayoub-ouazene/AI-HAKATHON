const prisma   =  require("../config/prisma");

const FormData = require('form-data');
const fs = require('fs');
const path = require('path');



exports.generateSlidesFromPitch = async (req, res) => {
  try {
    const startupId = req.user.id; 

    // 1. GET PDF PATH FROM DB
    const startup = await prisma.startup.findUnique({
      where: { id: startupId },
      select: { pitchDeckUrl: true }
    });

    if (!startup || !startup.pitchDeckUrl) {
      return res.status(404).json({ error: "No pitch deck URL found in database." });
    }

    const pdfLocation = startup.pitchDeckUrl;
    const formData = new FormData();

    // 2. GET THE FILE STREAM
    if (pdfLocation.startsWith('http')) {
      // CASE A: Remote URL (Cloudinary, etc.)
      console.log("Downloading PDF from URL...");
      const pdfResponse = await fetch(pdfLocation);
      
      if (!pdfResponse.ok) throw new Error("Could not download PDF file from URL.");
      
      // Convert web stream to buffer for the form
      const arrayBuffer = await pdfResponse.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      
      formData.append('file', buffer, 'pitch_deck.pdf');

    } else {
      // CASE B: Local File System
      // IMPORTANT: Adjust '../uploads' to match your folder structure!
      // If pdfLocation is already a full path, just use it directly.
      const filePath = path.resolve(pdfLocation);
      
      if (!fs.existsSync(filePath)) {
          return res.status(404).json({ error: "Local PDF file missing on server." });
      }

      const fileStream = fs.createReadStream(filePath);
      formData.append('file', fileStream, 'pitch_deck.pdf');
    }

    // 3. SEND TO FASTAPI
    console.log("Sending to AI Service (FastAPI)...");
    
    const aiResponse = await fetch('http://127.0.0.1:8000/generate-slides', {
      method: 'POST',
      body: formData,
      // CRITICAL: We must merge the form-data headers (which contain the boundary)
      headers: {
        ...formData.getHeaders() 
      }
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      throw new Error(`AI Service Error: ${aiResponse.status} ${errorText}`);
    }

    const aiData = await aiResponse.json();

    // 4. RETURN RESULT
    res.json(aiData);

  } catch (err) {
    console.error("Slide Generation Failed:", err);
    res.status(500).json({ error: err.message });
  }
};