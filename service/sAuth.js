const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerService = async ({name, email, password}) => {
 const checkEmail = await User.findOne({ email });

  if (checkEmail) {
    const error = new Error("User exist")
    error.status = 400
    throw error
  }
  // create user
  const salt = await bcrypt.genSalt(10);
  const hashPass = await bcrypt.hash(password, salt);

  const user = User({ name, email, password });
  user.password = hashPass;
  await user.save();
};

const loginService = async (email, password) => {
  
};

module.exports = {
  registerService,
  loginService,
};
