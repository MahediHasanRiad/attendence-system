const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { findUserByProperty, createNewUser } = require("../utils/userUtils");
const error = require("../utils/error");

const registerService = async ({
  name,
  email,
  password,
  roles,
  accountStatus,
}) => {
  const checkEmail = await findUserByProperty("email", email);

  if (checkEmail) throw error("User exist", 400);
  // create user
  const salt = await bcrypt.genSalt(10);
  const hashPass = await bcrypt.hash(password, salt);

  return createNewUser({
    name,
    email,
    password: hashPass,
    roles,
    accountStatus,
  });
};

const loginService = async ({ email, password }) => {
  const user = await findUserByProperty("email", email);

  if (!user) {
    throw error("Invalid Credential", 400);
  }

  // compare hash-password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw error("Invalid Credential", 400);
  }

  delete user._doc.password; // don't want to show password user screen
  // create token
  return (token = jwt.sign(user._doc, "secret", { expiresIn: "2h" }));
};

module.exports = {
  registerService,
  loginService,
};
