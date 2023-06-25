const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacherController.js');

// Create a new teacher
router.post('/', teacherController.createTeacher);

// Get a single teacher by ID
router.get('/:id', teacherController.getSingle);

// Get all 
router.get('/', teacherController.getAll);

// Update a teacher
router.put('/:id', teacherController.update);

// Delete a teacher
router.delete('/:id', teacherController.remove);

// Teacher login

router.post('/login', teacherController.login);

module.exports = router;
