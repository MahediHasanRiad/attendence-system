const express = require('express')
const app = express()
const mongoose = require('mongoose')
const User = require('../model/User')
const bcrypt = require('bcrypt')
const router = require('../router/index')


//middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))


// router
app.use(router)



// database connect
mongoose.connect('mongodb://localhost:27017/attendance-app')
.then(() => {
    console.log('database connected')
    app.listen(4444, () => {
        console.log('server on...')
    })
})