const express = require('express');
const router = express.Router();
const {
  createFeedback,
  getAllFeedback,
  getFeedbackById,
  updateFeedback,
  deleteFeedback
} = require('../controllers/feedbackController');

// Create a new feedback
router.post('/', createFeedback);

// Get all feedback
router.get('/', getAllFeedback);

// Get a specific feedback
router.get('/:id', getFeedbackById);

// Update a feedback
router.put('/:id', updateFeedback);

// Delete a feedback
router.delete('/:id', deleteFeedback);

module.exports = router;
