const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const studentRoutes = require("./routes/studentRoutes.js")
const teacherRoutes = require("./routes/teacherRoutes.js")
const feedbackRoutes = require("./routes/feedbackRoutes.js")
const newsRoutes = require("./routes/newsRoutes.js")
const courseRoutes = require("./routes/courseRoutes.js")

dotenv.config()

const app = express();

app.use(express.json());

// app.use("/api", router);
app.use(cors());

app.use(cors({
  origin: 'http://localhost:3000', 
  credentials: true, 
}));

app.options('*', cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

app.use('/api/students', studentRoutes);
app.use('/api/teachers', teacherRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/course', courseRoutes);

app.get("/", (req, res)=>{
  res.send("hello world")
});

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
      // useCreateIndex: true,
      // useUnifiedTopology: true
  })
  .then(() => console.log('DB Connected'))
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });



const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`)
})