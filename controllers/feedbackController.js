const Feedback = require('../models/feedbackModel');

// Create a new feedback
exports.createFeedback = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const feedback = new Feedback({ name, email, message });
    const newFeedback = await feedback.save();
    res.json({message: "Feedback created successfully.", newFeedback});
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to save feedback' });
  }
};

exports.getAllFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.find();
    res.json({ message: "All feedbacks fetched.", feedback });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve feedback' });
  }
};

// Get a specific feedback
exports.getFeedbackById = async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);
    if (!feedback) {
      return res.status(404).json({ error: 'Feedback not found' });
    }
    res.json({message: 'Feedback found' ,feedback});
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve feedback' });
  }
};

// Update a feedback
exports.updateFeedback = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const feedback = await Feedback.findByIdAndUpdate(
      req.params.id,
      { name, email, message },
      { new: true }
    );

    if (!feedback) {
      return res.status(404).json({ error: 'Feedback not found' });
    }

    res.json({ message: 'Feedback updated.', feedback });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update feedback' });
  }
};

// exports.updateFeedback = async (req, res) => {
//   try {
//     const { name, email, message } = req.body;
//     let feedback = await Feedback.findById(req.params.id);
//     if (!feedback) {
//       return res.status(404).json({ error: 'Feedback not found' });
//     }
//     feedback.name = name;
//     feedback.email = email;
//     feedback.message = message;
//     await feedback.save();
//     res.json({message: "Feedback updated.", feedback});
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Failed to update feedback' });
//   }
// };

// Delete a feedback
exports.deleteFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findByIdAndRemove(req.params.id);
    if (!feedback) {
      return res.status(404).json({ error: 'Feedback not found' });
    }
    res.json({ message: 'Feedback deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete feedback' });
  }
};
