const express = require('express');
const router = express.Router();
const multer = require('multer');
const courseController = require('../controllers/courseController');

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'smart/');
  },
});

const fileFilter = (req, file, cb) => {
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

// Create a new course
router.post('/', upload.single('image'), courseController.createCourse);

// Get all courses
router.get('/', courseController.getAllCourses);

// Get a single course by ID
router.get('/:courseId', courseController.getCourseById);

// Update a course by ID
router.put('/:courseId', upload.single('image'), courseController.updateCourse);

// Delete a course by ID
router.delete('/:courseId', courseController.deleteCourse);

module.exports = router;
