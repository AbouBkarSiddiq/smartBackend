const cloudinary = require('cloudinary').v2;
const Course = require('../models/courseModel');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Create a new course
exports.createCourse = async (req, res) => {
  try {
    const { title, description, price } = req.body;
    const image = req.file;

    // Check if an image was uploaded
    if (!image) {
      return res.status(400).json({ error: 'Please upload an image!' });
    }

    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(image.path);
    const imageUrl = result.secure_url;

    const newCourse = new Course({
      title,
      description,
      price,
      image: imageUrl,
    });

    await newCourse.save();

    res.status(201).json({ message: 'Course created successfully', newCourse });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while creating the course.' });
  }
};

// Get all courses
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json({message: "All courses fetched", courses});
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while retrieving the courses.' });
  }
};

// Get a single course by ID
exports.getCourseById = async (req, res) => {
  try {
    const { courseId } = req.params;

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ error: 'Course not found.' });
    }

    res.status(200).json({message: "Course fetched successfully", course});
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while retrieving the course.' });
  }
};

// Update a course by ID
exports.updateCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { title, description, price } = req.body;
    const image = req.file;
    console.log(courseId)
    // Check if an image was uploaded
    if (!image) {
      return res.status(400).json({ error: 'Please upload an image!' });
    }

    // Upload new image to Cloudinary
    const result = await cloudinary.uploader.upload(image.path);
    const imageUrl = result.secure_url;

    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      { title, description, price, image: imageUrl },
      { new: true }
    );

    console.log(updatedCourse)

    if (!updatedCourse) {
      return res.status(404).json({ error: 'Course not found.' });
    }

    res.status(200).json({ message: 'Course updated successfully', updatedCourse });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating the course.' });
  }
};

// Delete a course by ID
exports.deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.params;

    const deletedCourse = await Course.findByIdAndRemove(courseId);

    if (!deletedCourse) {
      return res.status(404).json({ error: 'Course not found.' });
    }

    res.status(200).json({ message: 'Course deleted successfully'});
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting the course.' });
  }
};

