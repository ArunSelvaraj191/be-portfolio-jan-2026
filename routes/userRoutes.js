const router = require("express").Router();
const axios = require("axios");
const User = require("../models/User");

router.get("/", async (req, res) => {
  // const response = await fetch("https://jsonplaceholder.typicode.com/users");
  // const data = await response.json();
  // const response = await axios.get(
  //   "https://jsonplaceholder.typicode.com/users",
  // );
  try {
    const users = await User.find();
    res.status(200).json({ message: "User route", data: users });
  } catch (error) {
    console.log("Error in /register route:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.put("/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const username = req.body;
    console.log("param id ::::", id, username);
    const updatedUser = await User.findByIdAndUpdate(id, username, {
      new: true,
    });
    console.log("updatedUser ::", updatedUser);
    res
      .status(200)
      .json({ message: "Updated Successfully", data: updatedUser });
  } catch (error) {
    console.log("Error in /register route:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    console.log("param id ::::", id);
    const deletedUser = await User.findByIdAndDelete(id);
    console.log("deletedUser ::", deletedUser);
    res
      .status(200)
      .json({ message: "Deleted Successfully", data: deletedUser });
  } catch (error) {
    console.log("Error in /register route:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
