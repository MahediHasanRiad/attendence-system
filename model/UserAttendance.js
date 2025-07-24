const { model, Schema } = require('mongoose')

const userAttendanceSchema = new Schema({

    createAt : Date,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    adminAttendance: {
        type: Schema.Types.ObjectId,
        ref: 'AdminAttendance'
    }

})

const UserAttendance = model('UserAttendance', userAttendanceSchema)

module.exports = UserAttendance;