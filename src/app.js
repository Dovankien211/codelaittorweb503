import express from "express";
import mongoose from "mongoose";


const app = express();

app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/kiemtra_nodejs_fa25")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB:", err));


const courseSchema = new mongoose.Schema(
  {
    courseName: String,
    views: Number,
    thumbnail: String,
    note: String,
    category: String,
  },
  {
    timestamps: true,
  }
);
const Course = new mongoose.model("Course", courseSchema);


app.get("/courses", async function (req, res) {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    res.json(error.message);
  }
});
app.post("/courses", async function (req, res) {
  try {
    const course = await Course.create(req.body);
    res.json(course);
  } catch (error) {
    res.json(error.message);
  }
});
app.get("/courses/:id", async function (req, res) {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.json("Khong tim thay");
    }
    res.json(course);
  } catch (error) {
    res.json(error.message);
  }
});
app.put("/courses/:id", async function (req, res) {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!course) {
      return res.json("Khong tim thay");
    }
    res.json(course);
  } catch (error) {
    res.json(error.message);
  }
});
app.delete("/courses/:id", async function (req, res) {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) {
      return res.json("Khong tim thay");
    }
    res.json("xoa thanh cong");
  } catch (error) {
    res.json(error.message);
  }
});




app.listen(3000, () => {
  console.log(`Server is running on port http://localhost:3000`);
});
