const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { registerService } = require('../service/sAuth')

// Registration
exports.registration = async (req, res) => {
  const { name, email, password } = req.body;

  // find empty field
  if (!name || !email || !password) {
    return res.status(400).json({ massage: "Invalid Request" });
  }
  
  const user = registerService(name, email, password)
  return res.status(201).json({ massage: "User Created", user });
};

// Login
exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ massage: "Invalid Credential" });
  }

  // compare hash-password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ massage: "Invalid credential" });
  }

  delete user._doc.password; // don't want to show password user screen
  // create token
  const token = jwt.sign(user._doc, "secret", { expiresIn: "2h" });
  return res.status(200).json({ massage: "Login Success", token });
};
