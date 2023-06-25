const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const studentRoutes = require("./routes/studentRoutes.js")
const teacherRoutes = require("./routes/teacherRoutes.js")

dotenv.config()

const app = express();

app.use(express.json());

// app.use("/api", router);
// Enable CORS
app.use(cors({ origin: 'http://localhost:3000' }));


app.use('/api/students', studentRoutes);
app.use('/api/teachers', teacherRoutes);

app.get("/", (req, res)=>{
  res.send("hello world")
});

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
      // useCreateIndex: true,
      // useUnifiedTopology: true
  })
  .then(() => console.log('DB Connected'));


const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`)
})