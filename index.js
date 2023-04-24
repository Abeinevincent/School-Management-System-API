const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const cors = require("cors");
const path = require("path");
const multer = require("multer");
const database = require("./models");
const authRoute = require("./routes/Auth");
const usersRoute = require("./routes/users/users");
const teachersRoute = require("./routes/teachers/teachers");
const studentsRoute = require("./routes/students/students");
const nonteachingstaffRoute = require("./routes/nonteachingstaff/nonteachingstaff");
const classroomRoute = require("./routes/classroom/classroom");
const subjectROute = require("./routes/subject/subject");
const sylabusRoute = require("./routes/sylabus/sylabus");
const resultsRoute = require("./routes/results/result");
const noticeRoute = require("./routes/noticeboard/noticeboard");
const messageRoute = require("./routes/message/message");
const classFeeRoute = require("./routes/fees/ClassFees");
const libraryRoute = require("./routes/library/library");
const feesRoute = require("./routes/fees/fees");
const examRoute = require("./routes/exam/exam");
const marksRoute = require("./routes/marks/marks");
const StoreRoute = require("./routes/storemanager/storemanager");
const DepartmentsRoute = require("./routes/departments/departments");
const accounttypeRoute = require("./routes/accounttype/accounttype");

// Middlewares

app.use(express.json());
// Allow requests from your frontend URL
const allowedOrigins = ["http://localhost:5173/"];
const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};
app.use(cors());

// Image Upload with multer
app.use("/images", express.static(path.join(__dirname, "public/images")));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploded successfully");
  } catch (error) {
    console.error(error);
  }
});

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/teachers", teachersRoute);
app.use("/api/students", studentsRoute);
app.use("/api/nonteachingstaff", nonteachingstaffRoute);
app.use("/api/classroom", classroomRoute);
app.use("/api/subject", subjectROute);
app.use("/api/sylabus", sylabusRoute);
app.use("/api/results", resultsRoute);
app.use("/api/noticeboard", noticeRoute);
app.use("/api/message", messageRoute);
app.use("/api/library", libraryRoute);
app.use("/api/classfee", classFeeRoute);
app.use("/api/fees", feesRoute);
app.use("/api/exams", examRoute);
app.use("/api/marks", marksRoute);
app.use("/api/accounttype", accounttypeRoute);
app.use("/api/storemanager", StoreRoute);
app.use("/api/departments", DepartmentsRoute);

// Configure sequelize to sync all models and create corresponding tables accordingly
database.sequelize.sync().then(() => {
  console.log("Db connection successful");
  const PORT = process.env.PORT || 8000;
  app.listen(PORT, () => {
    console.log(`Backend server is listening at port ${PORT}`);
  });
});
