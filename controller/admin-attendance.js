const AdminAttendance = require("../model/admin-attendance");
const error = require("../utils/error");
const { addMinutes, isAfter } = require("date-fns");

const enableAttendance = async (req, res, next) => {
  try {
    const running = await AdminAttendance.findOne({ status: "RUNNING" });
    if (running) {
      throw error("Already running...", 404);
    }
    const attendance = new AdminAttendance();
    await attendance.save();
    return res.status(200).json({ message: "Attendance Enable: ", attendance });
  } catch (e) {
    next(e);
  }
};

const runningAttendance = async (req, res, next) => {
  try {
    const running = await AdminAttendance.findOne({ status: "RUNNING" });
    if (!running) {
      throw error("Not running !!!", 404);
    }
    // add create time + time limit
    const start = addMinutes(new Date(running.createdAt), running.timeLimit);
    if (isAfter(new Date(), start)) {
      running.status = "COMPLETED";
      await running.save();
    }

    return res
      .status(200)
      .json({ message: "Attendance system Running...", running });
  } catch (e) {
    next(e);
  }
};

const disableAttendance = async (req, res, next) => {
  try {
    const running = await AdminAttendance.findOne({ status: "RUNNING" });
    if (!running) {
      throw error("Not running !!!", 404);
    }

    running.status = 'COMPLETED'
    await running.save()
    return res.status(200).json({message: 'Attendance Time Up...', running})

  } catch (e) {
    next(e);
  }
};

module.exports = {
  enableAttendance,
  runningAttendance,
  disableAttendance,
};
