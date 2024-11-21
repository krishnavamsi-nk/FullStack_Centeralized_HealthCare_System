const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: './uploads/',
    filename: function (req, file, cb) {
        const userId = req._id; 
        const extname = path.extname(file.originalname);
        cb(null, userId + '-' + Date.now() + extname);
    }
});

const upload = multer({ storage: storage });

exports.uploadImage = upload.single('image');