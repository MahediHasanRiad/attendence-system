const { model, Schema } = require('mongoose')

const adminAttendanceSchema = new Schema({
    timeLimite: Number,
    status: String,
    creatAt: Date
})

const AdminAttendance = model('AdminAttendance', adminAttendanceSchema)

module.exports = AdminAttendance;