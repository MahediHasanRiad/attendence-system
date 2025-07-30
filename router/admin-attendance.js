const { enableAttendance, disableAttendance, runningAttendance } = require('../controller/admin-attendance')

const router = require('express').Router()

router.get('/enable', enableAttendance)
router.get('/running', runningAttendance)
router.get('/disable', disableAttendance)


module.exports = router