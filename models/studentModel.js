const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  firstName: { 
    type: String,
    required: true
  },
  lastName: { 
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
  verified: {
    type: Boolean,
    default: false,
  },
  blocked: {
    type: Boolean,
    default: false,
  },
  subjects: [
    { type: String }
  ],
  password: { 
    type: String, 
    required: true 
  },
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
