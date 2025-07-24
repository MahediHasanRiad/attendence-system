const { model, Schema, Types } = require('mongoose')

const profileSchema = new Schema({
    firstName: String,
    lastName: String,
    phone: Number,
    avater: String,
    user: {
        Type: Schema.Types.ObjectId,
        ref: 'Profile'
    }
})

const Profile = model('Profile', profileSchema)

module.exports = Profile