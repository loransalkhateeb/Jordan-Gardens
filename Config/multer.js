const multer = require("multer");
const path = require("path");
const fs = require("fs");


const customStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = "uploads/";

    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const filename = file.originalname;
    const filePath = path.join("uploads", filename);


    if (fs.existsSync(filePath)) {
    
      const timestamp = Date.now();
      const ext = path.extname(filename);
      const baseName = path.basename(filename, ext);
      cb(null, `${baseName}-${timestamp}${ext}`);
    } else {
      cb(null, filename);
    }
  },
});


const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpg|jpeg|png|gif/; 
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error("Only images are allowed"), false);
  }
};


const upload = multer({
  storage: customStorage,
  fileFilter,
  limits: { fileSize: 1024 * 1024 * 5 }, 
});

module.exports = upload;
