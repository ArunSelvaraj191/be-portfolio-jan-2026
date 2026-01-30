const router = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

router.post("/login", async (req, res) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    console.log("Found user:", user);
    if (!user) {
      return res
        .status(401)
        .json({ message: "Invalid email/username Credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid Password Credentials" });
    }

    const token = jwt.sign(
      { username: user.username, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );
    res.status(200).json({ message: "Login Successful", token, user });
  } catch (error) {
    console.log("Error in /login route:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/register", async (req, res) => {
  try {
    console.log(req.body);
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this username already exists" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    console.log("Hashed Password:", hashPassword);
    const user = await User.create({
      username,
      email,
      password: hashPassword,
    });
    res.status(201).json({ message: "User Created Successfully", data: user });
  } catch (error) {
    console.log("Error in /register route:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
