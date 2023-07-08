const cloudinary = require('cloudinary').v2;
const multer = require("multer");
const dotenv = require("dotenv");
const News = require('../models/newsModel');

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});


// Create a new news article
exports.createNews = async (req, res) => {
  try {
    const { title, description } = req.body;
    const image = req.file;

    // console.log(title, description)
    // console.log(image)

    // Check if an image was uploaded
    if (!image) {
      return res.status(400).json({ error: 'Please upload an image!' });
    }

    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(image.path);

    const imageUrl = result.secure_url;

    const newNews = new News({
      title,
      description,
      image: imageUrl,
    });

    await newNews.save();

    res.status(201).json({message: "News has been created", newNews});
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while creating the news article.' });
  }
};

// Get all news articles
exports.getAllNews = async (req, res) => {
  try {
    const news = await News.find();
    res.status(200).json(news);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while retrieving the news articles.' });
  }
};


// Update a news article
exports.updateNews = async (req, res) => {
  try {
    const { newsId } = req.params;
    const { title, description } = req.body;
    const image = req.file;

    // Check if an image was uploaded
    if (!image) {
      return res.status(400).json({ error: 'Please upload an image!' });
    }

    // Upload new image to Cloudinary
    const result = await cloudinary.uploader.upload(image.path);
    const imageUrl = result.secure_url;

    const updatedNews = await News.findByIdAndUpdate(
      newsId,
      { title, description, image: imageUrl },
      { new: true }
    );

    console.log(updatedNews)
    
    if (!updatedNews) {
      return res.status(404).json({ error: 'News article not found.' });
    }

    res.status(200).json({ message: 'News article has been updated', updatedNews });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating the news article.' });
  }
};

// Get a single news article by ID
exports.getNewsById = async (req, res) => {
  try {
    const { newsId } = req.params;

    const news = await News.findById(newsId);

    if (!news) {
      return res.status(404).json({ error: 'News article not found.' });
    }

    res.status(200).json(news);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while retrieving the news article.' });
  }
};


// Delete a news article
exports.deleteNews = async (req, res) => {
  try {
    const { newsId } = req.params;

    const deletedNews = await News.findByIdAndRemove(newsId);

    if (!deletedNews) {
      return res.status(404).json({ error: 'News article not found.' });
    }

    res.status(200).json({ message: 'News article has been deleted' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting the news article.' });
  }
};
