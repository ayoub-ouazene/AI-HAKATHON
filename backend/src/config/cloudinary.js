const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const dotenv = require('dotenv');

dotenv.config();

cloudinary.config(); // Reads CLOUDINARY_URL

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    let folderName = 'invest-dz/others';
    // ... (Your existing logic for folders) ...
    if (file.fieldname === 'logo') folderName = 'invest-dz/logos';
    if (file.fieldname === 'pitchDeck') folderName = 'invest-dz/pitch-decks';
    if (file.fieldname === 'cnrc') folderName = 'invest-dz/legal';

    return {
      folder: folderName,
      public_id: `${file.fieldname}-${Date.now()}`,
    };
  },
});

// ADD LIMITS HERE
const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 } // Limit to 5MB (Safe for Free Tier)
});

module.exports = upload;