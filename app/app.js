const express = require('express')
const app = express()
const mongoose = require('mongoose')
const User = require('../model/User')
const bcrypt = require('bcrypt')
const { registration, login } = require('../controller/controller')

//middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))


// routers
app.post('/registration', registration)
app.post('/login', login)



// database connect
mongoose.connect('mongodb://localhost:27017/attendance-app')
.then(() => {
    console.log('database connected')
    app.listen(4444, () => {
        console.log('server on...')
    })
})