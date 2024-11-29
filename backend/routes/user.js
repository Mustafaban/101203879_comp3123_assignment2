const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const UserModel = require("../models/User");

router.post("/signup", async (req, res) => {
  try {
    const newUser = new UserModel(req.body);
    const user = await newUser.save();
    res.status(201).send(user);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Please enter valid username and password" });
  }
});
router.post("/login", async (req, res) => {
    var { username, password } = req.body;
    const existUsername = await UserModel.findOne({
      username: req.body.username,
    });
    const existPassword = await UserModel.findOne({
      password: req.body.password,
    });
  
    if (!existUsername | !existPassword)  {
      res
        .status(400)
        .json({ statust: false, message: "Invalid Username and password" });
    } else {
      res
        .status(200)
        .json({
          statust: true,
          username: req.body.username,
          message: "User logged in successfully",
        });
    }
  });
  
  module.exports = router;