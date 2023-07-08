const Teacher = require('../models/teacherModel.js');

const createTeacher = async (req, res) => {
  try {
    const { firstname, lastname, email, gender, subjects, password, degree } =
      req.body;
    // Check if the email already exists
    const existingTeacher = await Teacher.findOne({ email });
    if (existingTeacher) {
      res.send({ status: 400, message: { error: "Email already exists" } });
    } else {
      const newTec = await Teacher.collection.insertOne({
        firstName: firstname,
        lastName: lastname,
        email: email,
        gender: gender,
        subjects: subjects,
        password: password,
        degree: degree,
      });
      if (newTec) {
        res.send({
          status: 200,
          user: newTec,
        });
      }
      // console.log("new", n);
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while creating the teacher" });
  }
};
// Create a new teacher
// async function createTeacher(req, res) {
//   try {
//     const { firstName, lastName, email, gender, subjects, degree, password } = req.body;
//     // const {payload} = req.body;
//     // console.log(payload)
//     // Check if email already exists
//     const existingTeacher = await Teacher.findOne({ email });
//     if (existingTeacher) {
//       return res.status(409).json({ message: 'Email already exists' });
//     }

//     const teacher = new Teacher({ firstName, lastName, email, gender, subjects, degree, password });
//     const savedTeacher = await teacher.save();
//     res.status(201).json({ message: 'Teacher created successfully', teacher: savedTeacher });
//   } catch (error) {
//     res.status(500).json({ error: 'An error occurred while creating the teacher' });
//   }
// }

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

// Update a teacher by ID
const update = async (req, res) => {
  try {
    const { firstname, lastname, email, gender, subjects, degree, password } = req.body;
    const id = req.params.id;
    console.log("id", id);
    console.log("id", email);
    const existingTeacher = await Teacher.findOne({ email });
    if (existingTeacher && existingTeacher._id.toString() !== req.params.id) {
      return res.status(400).json({ error: "Email already exists" });
    }
    const teacher = await Teacher.findByIdAndUpdate(req.params.id);
    if (!teacher) {
      return res.status(404).json({ error: "Student not found" });
    } else {
      ( teacher.email = email),
        ( teacher.firstname = firstname),
        ( teacher.lastname = lastname),
        ( teacher.gender = gender),
        ( teacher.subjects = subjects),
        ( teacher.degree = degree),
         teacher.save();
      res.json({ message: "Teacher updated successfully",  teacher:  teacher });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while updating the teacher"});
  }
};

// Update a teacher
// async function update(req, res) {
//   try {
//     const { firstName, lastName, email, gender, subjects, degree, password } = req.body;
//     const updatedTeacher = await Teacher.findByIdAndUpdate(req.params.id, { firstName, lastName, email, gender, subjects, degree, password }, { new: true });
//     if (!updatedTeacher) {
//       return res.status(404).json({ message: 'Teacher not found' });
//     }
//     res.json({ message: 'Teacher updated successfully', teacher: updatedTeacher });
//   } catch (error) {
//     res.status(500).json({ error: 'An error occurred while updating the teacher' });
//   }
// }

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

async function login(req, res) {
  try {
    const { email, password } = req.body;

    // Find the teacher by email
    const teacher = await Teacher.findOne({ email });
    if (!teacher) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Check if the password matches
    if (teacher.password !== password) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.json({ message: 'Login successful', teacher });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while logging in' });
  }
}


module.exports = { createTeacher, getSingle, getAll, update, remove, login };
