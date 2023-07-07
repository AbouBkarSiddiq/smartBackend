const Student = require("../models/studentModel.js");
// Create a new student
const createStudent = async (req, res) => {
  try {
    const { firstname, lastname, email, gender, subjects, password } = req.body;

    // Check if the email already exists
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      res.send({ status: 400, message: { error: "Email already exists" } });
    } else {
      const newStd = await Student.collection.insertOne({
        firstName: firstname,
        lastName: lastname,
        email: email,
        gender: gender,
        subjects: subjects,
        password: password,
      });
      if (newStd) {
        res.send({
          status: 200,
          user: newStd,
        });
      }
      // console.log("new", n);
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while creating the student" });
  }
};

// Update a student by ID
const updateStudent = async (req, res) => {
  try {
    const { firstname, lastname, email, gender, subjects, password } = req.body;
    const id = req.params.id;
    console.log("id", id);
    console.log("id", email);
    const existingStudent = await Student.findOne({ email });
    if (existingStudent && existingStudent._id.toString() !== req.params.id) {
      return res.status(400).json({ error: "Email already exists" });
    }
    const student = await Student.findByIdAndUpdate(req.params.id);
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    } else {
      (student.email = email),
        (student.firstname = firstname),
        (student.lastname = lastname),
        (student.gender = gender),
        (student.subjects = subjects),
        student.save();
      res.json({ message: "Student updated successfully", student: student });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while updating the student" });
  }
};

// Get all students
const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.json({ message: "All students get successfully", students: students });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while retrieving the students" });
  }
};

// Get a single student by ID
const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.json({ message: "Student get successfully", students: student });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while retrieving the student" });
  }
};

// Delete a student by ID
const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndRemove(req.params.id);
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.json({ message: "Student deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while deleting the student" });
  }
};

async function login(req, res) {
  try {
    const { email, password } = req.body;

    // Find the student by email
    const student = await Student.findOne({ email });
    if (!student) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Check if the password matches
    if (student.password !== password) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.json({ message: "Login successful", student });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while logging in" });
  }
}

module.exports = {
  createStudent,
  updateStudent,
  getAllStudents,
  getStudentById,
  deleteStudent,
  login,
};
