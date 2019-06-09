const express = require("express");
const connectDB = require("./config/db");

const app = express();

//---------DB CONNECTION <--- db.js
connectDB();

//----------MiddleWare------------
app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.send("API Running"));

//Routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/trainers", require("./routes/api/trainers"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/authtrainer", require("./routes/api/authtrainer"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/trainerprofile", require("./routes/api/trainerprofile"));

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
