const Student = require('../models/studentModel.js');

// Create a new student
const createStudent = async (req, res) => {
  try {
    const { firstName, lastName, email, gender, subjects, password } = req.body;
    
    // Check if the email already exists
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const student = new Student({ firstName, lastName, email, gender, subjects, password });
    const savedStudent = await student.save();
    res.status(201).json({ message: 'Student created successfully', student: savedStudent });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while creating the student' });
  }
};

// Update a student by ID
const updateStudent = async (req, res) => {
  try {
    const { firstName, lastName, email, gender, subjects, password } = req.body;
    
    // Check if the email already exists
    const existingStudent = await Student.findOne({ email });
    if (existingStudent && existingStudent._id.toString() !== req.params.id) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const student = await Student.findByIdAndUpdate(
      req.params.id,
      { firstName, lastName, email, gender, subjects, password },
      { new: true }
    );
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.json({ message: 'Student updated successfully', student: student });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating the student' });
  }
};

// Get all students
const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.json({message: 'All students get successfully', students: students});
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while retrieving the students' });
  }
};

// Get a single student by ID
const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.json({message: 'Student get successfully', students: student});
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while retrieving the student' });
  }
};

// Delete a student by ID
const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndRemove(req.params.id);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.json({ message: 'Student deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting the student' });
  }
};

module.exports = {
  createStudent,
  updateStudent,
  getAllStudents,
  getStudentById,
  deleteStudent,
};
