const express = require('express');
const router = express.Router();
const multer = require('multer');
const newsController = require('../controllers/newsController');

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'smart/'); // Provide the full path to the destination folder
  },
});

const fileFilter = (req, file, cb) => {
  // Accept only image files
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

// Create a new news article
router.post('/', upload.single('image'), newsController.createNews);

// Get all news articles
router.get('/', newsController.getAllNews);

// Get a single news article by ID
router.get('/:newsId', newsController.getNewsById);

// Update a news article by ID
router.put('/:newsId', upload.single('image'), newsController.updateNews);

// Delete a news article by ID
router.delete('/:newsId', newsController.deleteNews);

module.exports = router;
