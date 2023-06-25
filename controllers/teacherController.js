const Teacher = require('../models/teacherModel.js');

// Create a new teacher
async function createTeacher(req, res) {
  try {
    const { firstName, lastName, email, gender, subjects, degree, password } = req.body;
    // const {payload} = req.body;
    // console.log(payload)
    // Check if email already exists
    const existingTeacher = await Teacher.findOne({ email });
    if (existingTeacher) {
      return res.status(409).json({ message: 'Email already exists' });
    }

    const teacher = new Teacher({ firstName, lastName, email, gender, subjects, degree, password });
    const savedTeacher = await teacher.save();
    res.status(201).json({ message: 'Teacher created successfully', teacher: savedTeacher });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while creating the teacher' });
  }
}

// Get a single teacher by ID
async function getSingle(req, res) {
  try {
    const teacher = await Teacher.findById(req.params.id);
    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }
    res.json({ message: 'Teacher retrieved successfully', teacher });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while retrieving the teacher' });
  }
}

// Get all teachers
async function getAll(req, res) {
  try {
    const teachers = await Teacher.find();
    res.json({ message: 'Teachers retrieved successfully', teachers });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while retrieving the teachers' });
  }
}

// Update a teacher
async function update(req, res) {
  try {
    const { firstName, lastName, email, gender, subjects, degree, password } = req.body;
    const updatedTeacher = await Teacher.findByIdAndUpdate(req.params.id, { firstName, lastName, email, gender, subjects, degree, password }, { new: true });
    if (!updatedTeacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }
    res.json({ message: 'Teacher updated successfully', teacher: updatedTeacher });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating the teacher' });
  }
}

// Delete a teacher
async function remove(req, res) {
  try {
    const deletedTeacher = await Teacher.findByIdAndRemove(req.params.id);
    if (!deletedTeacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }
    res.json({ message: 'Teacher deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting the teacher' });
  }
}

module.exports = { createTeacher, getSingle, getAll, update, remove };
