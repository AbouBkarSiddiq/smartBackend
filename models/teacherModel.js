const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: true
  },
  subjects: {
    type: [String],
    required: true
  },
  degree: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

const Teacher = mongoose.model('Teacher', teacherSchema);

module.exports = Teacher;
