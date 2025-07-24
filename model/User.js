const { model, Schema } = require('mongoose')

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        validate: {
            // email validation regex {function(v) => email}
            validator: function(v){
                return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v)
            },
            massage: 'Invalid Email' 
        }
    },
    password: {
        type: String,
        required: true,
        minlength: [6, 'password is to sort'] // if less then 6 letter
    },
    roles: {
        type: [String],
        default: 'STUDENT'
    },
    accountStatus: {
        type: String,
        enum: ['PENDING', 'ACTIVE', 'REJECTED'],
        default: 'PENDING',
        required: true
    }
})

const User = new model('User', userSchema)
module.exports = User;