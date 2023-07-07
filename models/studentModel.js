const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
  subjects: [{ type: String }],
  password: { type: String, required: true },
});

const Student = mongoose.model("Student", studentSchema);
module.exports = Student;
