const { registerService, loginService } = require("../service/sAuth");

// Registration
exports.registration = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    // find empty field
    if (!name || !email || !password) {
      return res.status(400).json({ massage: "Invalid Request" });
    }

    const user = await registerService({ name, email, password, roles, accountStatus });

    return res.status(201).json({ massage: "User Created", user });
  } catch (e) {
    next(e);
  }
};

// Login
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const token = await loginService({ email, password });
    return res.status(200).json({ massage: "Login Success", token });
  } catch (e) {
    next(e);
  }
};
