const AdminAttendance = require("../model/admin-attendance");
const error = require("../utils/error");
const StudentAttendance = require("../model/Student-Attendance");
const { addMinutes, isAfter } = require("date-fns");

const getStudentAttendance = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await AdminAttendance.findById(id);
    if (!user) throw error("User not found", 404);

    if (AdminAttendance.status === "COMPLETED")
      throw error("Already Completed", 400);

    let attendance = await StudentAttendance.findOne({
      adminAttendance: id,
      user: req.user._id,
    });
    if (attendance) throw error("Already Register", 400);

    attendance = new StudentAttendance({
      user: req.user._id,
      adminAttendance: id,
    });
    await attendance.save();
    return res.status(200).json({ message: "Success", attendance });

  } catch (e) {
    next(e);
  }
};

const getStudentStatus = async (req, res, next) => {
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

module.exports = {
  getStudentAttendance,
  getStudentStatus,
};
