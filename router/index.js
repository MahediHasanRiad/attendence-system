const authenticate = require('../middleware/authenticate')

const router = require("express").Router();
const authRouter = require("../router/authRouter");
const userRouter = require("../router/userRouter");
const adminAttendance = require("../router/admin-attendance");
const studentAttendance = require('./student-attendance')

router.use("/api/v1/auth", authRouter);
router.use("/api/v1/user", userRouter);
router.use("/api/v1/admin/attendance", adminAttendance);
router.use("/api/v1/student/attendance",authenticate, studentAttendance);

module.exports = router;
 