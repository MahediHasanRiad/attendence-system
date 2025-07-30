const { getStudentStatus, getStudentAttendance } = require('../controller/student-attendance')

const router = require('express').Router()

router.get('/status', getStudentStatus)
router.get('/:id', getStudentAttendance)

module.exports = router