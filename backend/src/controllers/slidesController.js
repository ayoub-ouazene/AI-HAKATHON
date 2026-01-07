const prisma = require("../config/prisma");

/**
 * Generates AI slides by fetching the PDF from Cloudinary 
 * and forwarding it to the FastAPI AI service.
 */
exports.generateSlidesFromPitch = async (req, res) => {
    try {
        const startupId = req.user.id; // From your Auth Middleware

        // 1. Fetch the Startup's Pitch Deck URL from the database
        const startup = await prisma.startup.findUnique({
            where: { id: startupId },
            select: { pitchDeckUrl: true }
        });

        if (!startup || !startup.pitchDeckUrl) {
            return res.status(404).json({ 
                error: "Pitch deck not found. Please upload your pitch deck first." 
            });
        }

        const pdfUrl = startup.pitchDeckUrl;
        console.log(`[Slides] Starting process for URL: ${pdfUrl}`);

        // 2. Download the PDF from Cloudinary
        const pdfResponse = await fetch(pdfUrl);
        if (!pdfResponse.ok) {
            console.error(`[Slides] Cloudinary Download Failed: ${pdfResponse.status}`);
            return res.status(502).json({ error: "Failed to retrieve PDF from storage." });
        }

        // Convert the response to a Buffer
        const arrayBuffer = await pdfResponse.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // 3. Prepare Multipart Form Data for FastAPI
        // Using native Blob + FormData for maximum compatibility with FastAPI
        const formData = new FormData();
        const fileBlob = new Blob([buffer], { type: 'application/pdf' });
        
        // Key 'file' must match 'file: UploadFile' in main.py
        formData.append('file', fileBlob, 'pitch_deck.pdf');

        // 4. Forward to FastAPI Service
        console.log("[Slides] Forwarding to AI Service (Port 8000)...");
        const aiResponse = await fetch('http://127.0.0.1:8000/generate-slides', {
            method: 'POST',
            body: formData,
            // NOTE: Do NOT set Content-Type header manually; fetch handles the boundary.
        });

        if (!aiResponse.ok) {
            const errorText = await aiResponse.text();
            console.error(`[Slides] AI Service Error: ${aiResponse.status} - ${errorText}`);
            return res.status(aiResponse.status).json({ 
                error: "AI Generation Service is currently unavailable.",
                details: errorText 
            });
        }

        const aiData = await aiResponse.json();

        // 5. Success - Return the slides to the Frontend
        console.log("[Slides] Successfully generated slides.");
        return res.status(200).json({
            message: "Slides generated successfully",
            data: aiData
        });

    } catch (error) {
        console.error("[Slides] Critical Controller Error:", error);
        return res.status(500).json({ 
            error: "An internal error occurred during slide generation.",
            message: error.message 
        });
    }
};