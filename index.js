// const http = require("http");
// const PORT = 5000;

// const server = http.createServer((req, res) => {
//   res.writeHead(200, { "Content-Type": "text/plain" });
//   res.end("Hello from portfolio backend server");
// });

// server.listen(PORT, () => {
//   console.log(`Server is listening on port ${PORT}`);
// });

const express = require("express");
const cors = require("cors");
const authRotes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const app = express();
app.use(cors());
app.use(express.json());

dotenv.config();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "";
console.log("PORT from env:", PORT, process.env.MONGO_URI);
app.use("/auth", authRotes);
app.use("/user", userRoutes);

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB:", error);
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
