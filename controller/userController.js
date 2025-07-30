const serviceUser = require("../utils/userUtils");
const { registerService } = require("../service/sAuth");
const User = require("../model/User");

const getAllUser = async (req, res, next) => {
  try {
    const user = await serviceUser.findAllUser();
    return res.status(200).json({ message: "All Users", user });
  } catch (e) {
    next(e);
  }
};

const findUserById = async (req, res, next) => {
  try {
    const id = req.params.id;
    console.log(id);
    const user = await serviceUser.findUserByProperty("_id", id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "user found", user });
  } catch (e) {
    next(e);
  }
};

const getUserByEmail = async (req, res, next) => {
  try {
    const email = req.params.email;
    const user = await serviceUser.findUserByProperty("email", email);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "user found", user });
  } catch (e) {
    next(e);
  }
};

const createUser = async (req, res, next) => {
  try {
    const { name, email, password, roles, accountStatus } = req.body;
    if (!name || !email || !password) {
      return res.status(404).json({ message: "Empty filed" });
    }

    const user = await registerService({
      name,
      email,
      password,
      roles,
      accountStatus,
    });

    return res.status(201).json({ message: "created", user });
  } catch (e) {
    next(e);
  }
};

const userUpdateById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { name, email, roles, accountStatus } = req.body;

    const user = await serviceUser.findUserByProperty("_id", id);
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.roles = roles || user.roles;
    user.accountStatus = accountStatus || user.accountStatus;

    await user.save();
    return res.status(200).json({ message: "updated", user });
  } catch (e) {
    next(e);
  }
};

const userDeleteById = async (req, res, next) => {
  try {
    const id = req.params.id; 
    const user = await serviceUser.findUserByProperty("_id", id);

    if(!user) {
      return res.status(404).json({ message: "user not found" });
    }
    await user.deleteOne()
    return res.status(200).json({message: 'Deleted', user})


  } catch (e) {
    next(e);
  }
};

module.exports = {
  getAllUser,
  findUserById,
  getUserByEmail,
  createUser,
  userUpdateById,
  userDeleteById
};
