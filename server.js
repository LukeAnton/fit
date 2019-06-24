const express = require("express");
const connectDB = require("./config/db");
const path = require("path");
const app = express();

//---------DB CONNECTION <--- db.js
connectDB();

//----------MiddleWare------------
app.use(express.json({ extended: false }));

//Routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/trainers", require("./routes/api/trainers"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/authtrainer", require("./routes/api/authtrainer"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/trainerprofile", require("./routes/api/trainerprofile"));

//Serve static assets in prod
if (process.env.NODE_ENV === "production") {
  //set static folder
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
